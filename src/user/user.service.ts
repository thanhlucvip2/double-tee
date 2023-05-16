import { UserInfoDto } from './dto/user-info.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import {
  CreateUserDto,
  ResendCodeDto,
  VeryCodeDto,
} from './dto/create-user.dto';

import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { MailerService } from '@nestjs-modules/mailer';
import { USER_STATUS } from '@/constants/constants_user-status';
import { PaginationDto } from '@/shared/pagination.dto';
import { ResponsePagination } from '@/shared/response.pagination';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private readonly mailservice: MailerService,
    private entityManager: EntityManager,
  ) {}

  async register(newUser: CreateUserDto): Promise<{ message: string }> {
    const checkEmail = await this.userRepository.findOne({
      where: {
        email: newUser.email,
      },
    });
    if (checkEmail) {
      throw new HttpException(
        'Email đã tồn tại trong hệ thống',
        HttpStatus.BAD_REQUEST,
      );
    }

    const comparePassword = await bcrypt.hash(newUser.password, 12);

    const veryCode = `${Math.floor(100000 + Math.random() * 900000)}`;

    const user = this.userRepository.create({
      password: comparePassword,
      veryCode,
      email: newUser.email,
      name: newUser.name,
    });
    await this.userRepository.save(user);

    try {
      await this.mailservice.sendMail({
        to: user.email,
        from: 'Hacheehouse Shop',
        subject: 'Very Code', // Subject line
        text: 'Hacheehouse Shop', // plaintext body
        html: `<h1> VeryCode : ${veryCode}</h1>`,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

    return {
      message: 'Đăng ký thành công, vui lòng kiểm tra email!',
    };
  }

  async veryCode(data: VeryCodeDto) {
    const { email, code } = data;
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new HttpException(
        'Email không tồn tại trong hệ thống!',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (user.veryCode != code) {
      throw new HttpException(
        'Mã xác nhận không đúng, vui lòng thử lại!',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (user.userStatus === USER_STATUS.ACTIVE) {
      throw new HttpException(
        'Email đã được xác nhận, vui lòng đăng nhập!',
        HttpStatus.BAD_REQUEST,
      );
    }

    this.userRepository.update(
      { email },
      { ...user, userStatus: USER_STATUS.ACTIVE, updateAt: new Date() },
    );

    return { message: 'Xác minh thành công, vui lòng đăng nhập!' };
  }
  async resendCode(data: ResendCodeDto) {
    const { email } = data;
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new HttpException(
        'Email không tồn tại trong hệ thống!',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (user.userStatus === USER_STATUS.ACTIVE) {
      throw new HttpException(
        'Email đã được kích hoạt, vui lòng đăng nhập!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const userCreateTime = new Date(user.updateAt).getTime();
    const currentTime = new Date().getTime();
    const timeResend = Math.floor((currentTime - userCreateTime) / 1000);

    if (timeResend < 120) {
      throw new HttpException(
        `Vui lòng đợi ${120 - timeResend} giây, để gửi lại mã !`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const veryCode = `${Math.floor(100000 + Math.random() * 900000)}`;
    this.userRepository.update(
      { email },
      { ...user, veryCode, updateAt: new Date() },
    );
    try {
      await this.mailservice.sendMail({
        to: user.email,
        from: 'Hacheehouse Shop',
        subject: 'Very Code', // Subject line
        text: 'Hacheehouse Shop', // plaintext body
        html: `<h1> VeryCode : ${veryCode}</h1>`,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

    return {
      message: 'Gửi mã, vui lòng kiểm tra email!',
    };
  }

  async login(userLogin: LoginUserDto): Promise<string> {
    const user = await this.userRepository.findOne({
      where: {
        email: userLogin.email,
      },
    });
    if (!user) {
      throw new HttpException(
        'Email không tồn tại trong hệ thống',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!(await bcrypt.compare(userLogin.password, user.password))) {
      throw new HttpException(
        'Mật khẩu không đúng vui lòng thử lại!',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (user.userStatus === USER_STATUS.CREATE) {
      throw new HttpException(
        'Email chưa được kích hoạt!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const jwt = await this.jwtService.signAsync({
      email: user.email,
      id: user.id,
      name: user.name,
      role: user.role,
    });
    return jwt;
  }

  async getUserInfo(userId: string): Promise<UserInfoDto> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      return {
        email: user.email,
        id: user.id,
        name: user.name,
        createAt: user.createAt,
        updateAt: user.updateAt,
        userStatus: user.userStatus,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllUser(pagination: PaginationDto) {
    // const user = await this.userRepository.find();
    // const allUser = user.map((item) => ({
    //   email: item.email,
    //   id: item.id,
    //   name: item.name,
    //   createAt: item.createAt,
    //   updateAt: item.updateAt,
    //   userStatus: item.userStatus,
    // }));
    // return allUser;
    const {
      // fromDate = new Date(),
      // toDate = new Date(),
      pageIndex = 0,
      pageSize = 10,
    } = pagination;

    // const sqlFromDate = convertDateTimeToDateString(fromDate);
    // const sqlToDate = convertDateTimeToDateString(adddate(toDate, 1)); // tặng thêm 1 ngày cho date hiện tại

    const queryBuilder = await this.entityManager
      .createQueryBuilder(UserEntity, 'user')
      // .andWhere('receive.created >= :sqlFromDate', { sqlFromDate })
      // .andWhere('receive.created <= :sqlToDate', { sqlToDate })
      .orderBy({ 'user.createAt': 'ASC' })
      .limit(pageSize)
      .offset(pageIndex * pageSize);

    const total = await queryBuilder.getCount();
    const items = await queryBuilder.getMany();
    const result = new ResponsePagination<UserEntity>({
      pageIndex,
      pageSize,
      total,
      items,
    });

    return result;
  }
}
