import { APIRequestContext } from "@playwright/test";
import { gatewayServiceUrl } from "../test-constants";

export async function getServices(request: APIRequestContext) {
  const response = await request.get(gatewayServiceUrl);

  if (!response.ok()) {
    throw new Error(`API request failed with status ${response.status()}`);
  }

  if (response.status() !== 200) {
    throw new Error(`Unexpected status code: ${response.status()}`);
  }

  const resBody = await response.json();
  
  console.log("responseBody", resBody);

  if (!resBody || !Array.isArray(resBody.data)) {
    throw new Error("Invalid or empty response data received.");
  }

  return resBody.data.items;
}
