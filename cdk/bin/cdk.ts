#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkStack } from '../lib/cdk-stack';

const app = new cdk.App();
new CdkStack(app, "CdkStack", {
    env: {
      account: "204894123339",
      region: "eu-west-2",
    },
  });
