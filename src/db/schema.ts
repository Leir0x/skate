import { relations, type InferModel } from "drizzle-orm"
import {
  int,
  json,
  mysqlEnum,
  mysqlTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/mysql-core"

export const stores = mysqlTable("stores", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 191 }).notNull(),
  name: varchar("name", { length: 191 }).notNull(),
  description: text("description"),
  slug: text("slug"),
})

export type Store = InferModel<typeof stores>

export const storesRelations = relations(stores, ({ many }) => ({
  products: many(products),
}))

export const products = mysqlTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  description: text("description"),
  images: json("images"),
  category: mysqlEnum("category", [
    "skateboard",
    "clothing",
    "shoes",
    "accessories",
  ])
    .default("skateboard")
    .notNull(),
  price: int("price").default(0).notNull(),
  quantity: int("quantity").default(1).notNull(),
  inventory: int("inventory").default(1).notNull(),
  rating: int("rating").default(0).notNull(),
  storeId: varchar("storeId", { length: 191 }).notNull(),
})

export type Product = InferModel<typeof products>

export const productsRelations = relations(products, ({ one }) => ({
  store: one(stores, { fields: [products.storeId], references: [stores.id] }),
}))