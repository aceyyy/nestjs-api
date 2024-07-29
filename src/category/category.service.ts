import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { Model } from 'mongoose';
import { Query } from 'express-serve-static-core';
import { CategoryGetProps } from './category.controller';
import { User } from 'src/auth/schemas/user.schema';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<Category>,
  ) {}

  async findAll(query: Query): Promise<CategoryGetProps> {
    try {
      const resPerPage = Number(query.limit) || 10;;
      const currentPage = Number(query.page) || 1;
      const skip = resPerPage * (currentPage - 1);

      const total = await this.categoryModel.countDocuments();

      let categoriesQuery = this.categoryModel
        .find({})
        .populate("createdBy", "name")
        .sort({ createdAt: -1 });

      if (query.page && query.limit) {
        categoriesQuery = categoriesQuery.limit(resPerPage).skip(skip);
      }

      const response = await categoriesQuery;

      return { data: response, total };

    } catch (error) {
      throw error;
    }
  }

  async create(categoryDto: CreateCategoryDto, user: User): Promise<Category> {
    const data = Object.assign(categoryDto, { createdBy: user._id });

    const response = await this.categoryModel.create(data);
    return response;
  }
}
