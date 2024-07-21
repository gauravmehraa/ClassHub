import { S3Client } from "@aws-sdk/client-s3";

export const connectToS3 = async () => {
  try{
    if(!process.env.S3_BUCKET_REGION){
      throw new Error("No bucket region defined");
    }
    if(!process.env.AWS_ACCESS_KEY){
      throw new Error("No AWS access key defined");
    }
    if(!process.env.AWS_SECRET_ACCESS_KEY){
      throw new Error("No AWS seret access key defined");
    }
    const s3 = new S3Client({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
      region: process.env.S3_BUCKET_REGION
    });
    return s3;
  }
  catch (error){
    console.log("[ERROR] - AWS S3: " + (error as Error).message);
  }
}