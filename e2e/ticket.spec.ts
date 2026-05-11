import { test, expect } from "@playwright/test";

test("完整流程：创建工单并验证", async ({ page }) => {
  await page.goto("http://localhost:5173", { waitUntil: "networkidle" }); // 前端开发服务器
  await page.getByText("创建工单").click();
  await page.getByLabel("标题").fill("E2E 测试工单");
  await page.getByLabel("描述").fill("这是一个通过 Playwright 创建的工单");
  await page.getByLabel("优先级").selectOption("medium");
  await page.getByRole("button",{ name:"创建" }).click();
  await expect(page.getByText("E2E 测试工单")).toBeVisible({ timeout: 15000 });
});