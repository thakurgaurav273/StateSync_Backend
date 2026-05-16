import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { v2 as cloudinary } from "cloudinary";

@Injectable()
export class AttachmentsService {
  constructor(private prisma: PrismaService) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadIssueAttachment(file: Express.Multer.File, issueId: number, userId: number) {
    try {
      const issue = await this.prisma.issue.findUnique({
        where: {
          id: issueId,
        },
      });

      if (!issue) {
        throw new HttpException("Issue not found", 404);
      }

      const uploadedFile = await cloudinary.uploader.upload(file.path, {
        folder: "statesync/issues",
        resource_type: "auto",
      });

      const attachment = await this.prisma.issueAttachment.create({
        data: {
          issue: {
            connect: {
              id: issueId,
            },
          },

          organization: {
            connect: {
              id: issue.organizationId,
            },
          },

          uploadedBy: {
            connect: {
              id: userId,
            },
          },

          fileName: file.originalname,
          fileUrl: uploadedFile.secure_url,
          fileType: file.mimetype,
          fileSize: file.size,
          storageKey: uploadedFile.public_id,
        },
      });

      return attachment;
    } catch (err) {
      throw err;
    }
  }

  async getIssueAttachments(issueId: number) {
    return this.prisma.issueAttachment.findMany({
      where: {
        issueId,
      },

      include: {
        uploadedBy: true,
      },
    });
  }

  async removeAttachment(id: number) {
    const attachment = await this.prisma.issueAttachment.findUnique({
      where: {
        id,
      },
    });

    if (!attachment) {
      throw new HttpException("Attachment not found", 404);
    }

    if (attachment.storageKey) {
      await cloudinary.uploader.destroy(attachment.storageKey, {
        resource_type: "auto",
      });
    }

    await this.prisma.issueAttachment.delete({
      where: {
        id,
      },
    });

    return {
      message: "Attachment removed successfully",
    };
  }
}
