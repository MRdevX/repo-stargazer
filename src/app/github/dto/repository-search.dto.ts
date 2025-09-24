import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class RepositorySearchDto {
  @ApiProperty({
    description: "Search query for repositories",
    example: "react typescript",
  })
  @IsString()
  query!: string;

  @ApiPropertyOptional({
    description: "Filter by programming language",
    example: "typescript",
  })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiPropertyOptional({
    description: "Filter by creation date",
    example: "2025-01-01",
  })
  @IsOptional()
  @IsString()
  created?: string;
}
