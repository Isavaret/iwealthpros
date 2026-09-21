import { chromium } from "playwright";
import { readFileSync } from "node:fs";

const dir = "/private/tmp/claude-502/-Users-oboberon-Developer-iwealthpros/08757824-1eed-4767-ab2f-69c1c45539e2/scratchpad/shots";
const cookies = readFileSync("/tmp/pc.txt", "utf8")
  .split("\n")
  .map((l) => l.replace(/^#HttpOnly_/, ""))
  .filter((l) => l.trim() && !l.startsWith("#"))
  .map((l) => l.split("\t"))
  .filter((p) => p.length >= 7)
  .map((p) => ({ name: p[5], value: p[6], domain: "iwealthpros.com", path: "/", secure: true, httpOnly: true }));

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
await ctx.addCookies(cookies);
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message.slice(0, 120)}`));
page.on("console", (m) => { if (m.type() === "error") errors.push(`console: ${m.text().slice(0, 120)}`); });

await page.goto("https://iwealthpros.com/admin", { waitUntil: "networkidle" });
console.log("url:", page.url());
await page.locator("tbody button").first().click();
await page.waitForTimeout(1500);

const body = await page.locator("body").innerText();
console.log("หน้าพัง:", /couldn.t load|Application error|Unhandled/i.test(body) ? "พัง ❌" : "ปกติ ✅");
console.log("กางรายละเอียด:", body.includes("ข้อมูล ณ วันที่") ? "สำเร็จ ✅" : "ไม่ขึ้น ❌");
const m = body.match(/ข้อมูล ณ วันที่\s*\n\s*([^\n]*)/);
console.log("ค่าวันที่ที่แสดง:", m ? m[1] : "(ไม่พบ)");
console.log("js errors:", errors.length ? errors.slice(0, 2) : "ไม่มี");
await page.screenshot({ path: `${dir}/admin-expanded.png` });
await browser.close();
