import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from '@nestjs/passport';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

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

  @Put(':id')
  @UseGuards(AuthGuard())
  async updateCategory(
    @Param('id')
    id: string,
    @Body()
    category: UpdateCategoryDto,
    @Req() req,
  ): Promise<Category> {
    return this.categoryService.updateById(id, category, req.user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteCategory(
    @Param('id')
    id: string,
  ): Promise<Category> {
    return this.categoryService.deleteById(id);
  }
}
