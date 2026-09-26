import { describe, expect, it } from "vitest";
import { products } from "../client/src/pages/Home";

describe("product showcase catalog", () => {
  it("keeps every product uniquely addressable from the showcase", () => {
    expect(products).toHaveLength(13);
    expect(new Set(products.map((product) => product.id)).size).toBe(products.length);
    expect(products.every((product) => product.image.length > 0)).toBe(true);
  });

  it("keeps both collections represented with product detail destinations", () => {
    expect(products.filter((product) => product.collection === "Edition")).toHaveLength(3);
    expect(products.filter((product) => product.collection === "SYZEX")).toHaveLength(10);
    expect(products.every((product) => product.url.startsWith("https://"))).toBe(true);
  });
});
