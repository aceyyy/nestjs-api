import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from '@nestjs/passport';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';

export interface CategoryGetProps {
  data: Category[];
  total: number;
}

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllCategory(@Query() query): Promise<CategoryGetProps> {
    return this.categoryService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createCategory(
    @Body()
    category: CreateCategoryDto,
    @Req() req,
  ): Promise<Category> {
    return this.categoryService.create(category, req.user);
  }
}
