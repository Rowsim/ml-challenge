import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3Deployment from "@aws-cdk/aws-s3-deployment";

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

        // S3 Bucket
        const bucket = new s3.Bucket(this, "MlChallengeBucket", {
          publicReadAccess: true,
          websiteIndexDocument: "index.html",
        });
    
        // S3 Deployment
        new s3Deployment.BucketDeployment(this, "CdkDeployment", {
          sources: [s3Deployment.Source.asset("../build")],
          destinationBucket: bucket,
        });
  }
}
