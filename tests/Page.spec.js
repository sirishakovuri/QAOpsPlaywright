import test, { expect } from "@playwright/test";
//30 seconds-test timeout error
test('playwright special locators', async ({ page }) =>
     {
          test.setTimeout(60_000);

          const slowExpect=expect.configure({ timeout: 90000 });
page.setDefaultTimeout(60_000);
          await page.goto("https://rahulshettyacademy.com/angularpractice/");
await page.getByLabel("Check me out if you Love IceCreams!").click();
await page.getByLabel("Employed").check();
await page.getByLabel("Gender").selectOption("Female");
await page.getByPlaceholder("password").fill("abc123");
await page.getByRole("button", { name: "Submit" }).click();
await page.getByText("Success! The Form has been submitted successfully!").isVisible();
//5 seconds default timeout for expect asserrtions --(timeout:10000)step level
await slowExpect(page.getByText("Success! The Form has been submitted successfully!")).toBeVisible({timeout:10_000 });
await page.getByRole("link", { name: "Shop" }).click();
await slowExpect(page.locator(".my-4").first()).toHaveText("Shop");
await page.locator("app-card").filter({ hasText: 'Nokia Edge'}).getByRole("button").click();
});
