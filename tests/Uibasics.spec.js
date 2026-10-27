import { test, expect } from "@playwright/test";

    test('Ui cintrol',async({page})=>
    {
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const userName=page.locator("#userName");
const signInBtn= page.locator("signInBtn");
const dropdown =page.locator("select.form-control");
const documentLink=page.locator("[href*=documents-request]");
await dropdown.selectOption("consult");
await page.locator(".radiotextsty").last().click();
await page.locator("#okayBtn").click();
console.log(await page.locator(".radiotextsty").last().isChecked());
await expect(page.locator(".radiotextsty").last()).toBeChecked();
await page.locator("#terms").click();
await expect(page.locator("#terms")).toBeChecked();
await page.locator("#terms").uncheck();
 expect(await page.locator("#terms").isChecked()).toBeFalsy();
 await expect(documentLink).toHaveAttribute("class","blinkingText");

     });














