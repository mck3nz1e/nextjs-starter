import { urls } from "../e2e/types/urls";
const cname = process.env.aws_env_cname as string;

function creatUrl(env: string): string {
  return `http://${env}`;
}

export const testUrls: urls = {
  local: "localhost:3000",
  staging: creatUrl(cname),
  production: creatUrl(cname),
};
