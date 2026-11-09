// app.js
import React, { useState, useEffect, useContext, createContext, useMemo, useRef } from "react";
import { createRoot } from "react-dom/client";
var INITIAL_STORES = [
  {
    id: "s1",
    name: "\u0E21\u0E34\u0E19\u0E15\u0E4C\u0E01\u0E31\u0E1A\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E19 (Mint & Friends)",
    ownerId: "student1",
    ownerName: "\u0E21\u0E34\u0E19\u0E15\u0E4C",
    ownerAvatar: "\u{1F469}\u{1F3FB}",
    classId: "c1",
    category: "\u0E2D\u0E32\u0E2B\u0E32\u0E23 & \u0E40\u0E1A\u0E40\u0E01\u0E2D\u0E23\u0E35\u0E48",
    tagline: "\u0E02\u0E2D\u0E07\u0E2D\u0E23\u0E48\u0E2D\u0E22 \u0E17\u0E33\u0E2A\u0E14\u0E43\u0E2B\u0E21\u0E48\u0E17\u0E38\u0E01\u0E40\u0E0A\u0E49\u0E32 \u0E04\u0E31\u0E14\u0E2A\u0E23\u0E23\u0E08\u0E32\u0E01\u0E1E\u0E27\u0E01\u0E40\u0E23\u0E32 \u0E21.4/1",
    emoji: "\u{1F96A}",
    color: "emerald",
    isVerified: true,
    rating: 4.9,
    reviewCount: 38
  },
  {
    id: "s2",
    name: "\u0E1F\u0E49\u0E32\u0E17\u0E33\u0E40\u0E2D\u0E07 Handmade Studio",
    ownerId: "student3",
    ownerName: "\u0E1F\u0E49\u0E32",
    ownerAvatar: "\u{1F469}\u{1F3FD}",
    classId: "c1",
    category: "\u0E07\u0E32\u0E19\u0E04\u0E23\u0E32\u0E1F\u0E15\u0E4C & DIY",
    tagline: "\u0E07\u0E32\u0E19\u0E41\u0E2E\u0E19\u0E14\u0E4C\u0E40\u0E21\u0E14\u0E40\u0E25\u0E47\u0E01 \u0E46 \u0E17\u0E35\u0E48\u0E15\u0E31\u0E49\u0E07\u0E43\u0E08\u0E17\u0E33\u0E14\u0E49\u0E27\u0E22\u0E04\u0E27\u0E32\u0E21\u0E1B\u0E23\u0E30\u0E13\u0E35\u0E15",
    emoji: "\u{1F338}",
    color: "purple",
    isVerified: true,
    rating: 4.8,
    reviewCount: 24
  },
  {
    id: "s3",
    name: "\u0E0A\u0E21\u0E23\u0E21\u0E27\u0E31\u0E19\u0E14\u0E35\u0E14\u0E35 Bakery",
    ownerId: "student4",
    ownerName: "\u0E15\u0E49\u0E19",
    ownerAvatar: "\u{1F468}\u{1F3FB}",
    classId: "c2",
    category: "\u0E2D\u0E32\u0E2B\u0E32\u0E23 & \u0E40\u0E1A\u0E40\u0E01\u0E2D\u0E23\u0E35\u0E48",
    tagline: "\u0E02\u0E19\u0E21\u0E2D\u0E1A\u0E2A\u0E14\u0E43\u0E2B\u0E21\u0E48\u0E17\u0E38\u0E01\u0E40\u0E0A\u0E49\u0E32 \u0E40\u0E15\u0E34\u0E21\u0E1E\u0E25\u0E31\u0E07\u0E43\u0E08\u0E01\u0E48\u0E2D\u0E19\u0E40\u0E02\u0E49\u0E32\u0E41\u0E16\u0E27",
    emoji: "\u{1F9C1}",
    color: "amber",
    isVerified: true,
    rating: 4.7,
    reviewCount: 19
  },
  {
    id: "s4",
    name: "Craft & Clay \u0E42\u0E14\u0E22 \u0E01\u0E32\u0E19\u0E15\u0E4C",
    ownerId: "student6",
    ownerName: "\u0E01\u0E32\u0E19\u0E15\u0E4C",
    ownerAvatar: "\u{1F466}\u{1F3FC}",
    classId: "c2",
    category: "\u0E07\u0E32\u0E19\u0E04\u0E23\u0E32\u0E1F\u0E15\u0E4C & DIY",
    tagline: "\u0E1E\u0E27\u0E07\u0E01\u0E38\u0E0D\u0E41\u0E08\u0E41\u0E25\u0E30\u0E08\u0E32\u0E19\u0E23\u0E2D\u0E07\u0E40\u0E23\u0E0B\u0E34\u0E48\u0E19 \u0E1B\u0E31\u0E49\u0E19\u0E21\u0E37\u0E2D\u0E17\u0E38\u0E01\u0E0A\u0E34\u0E49\u0E19\u0E44\u0E21\u0E48\u0E21\u0E35\u0E0B\u0E49\u0E33",
    emoji: "\u{1F3A8}",
    color: "blue",
    isVerified: false,
    rating: 4.6,
    reviewCount: 12
  }
];
var INITIAL_PRODUCTS = [
  {
    id: "p1",
    storeId: "s1",
    storeName: "\u0E21\u0E34\u0E19\u0E15\u0E4C\u0E01\u0E31\u0E1A\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E19",
    title: "\u0E41\u0E0B\u0E19\u0E14\u0E4C\u0E27\u0E34\u0E0A\u0E44\u0E02\u0E48\u0E42\u0E1A\u0E23\u0E32\u0E13\u0E44\u0E2A\u0E49\u0E17\u0E30\u0E25\u0E31\u0E01",
    category: "\u0E2D\u0E32\u0E2B\u0E32\u0E23 & \u0E40\u0E1A\u0E40\u0E01\u0E2D\u0E23\u0E35\u0E48",
    price: 35,
    cost: 18,
    stock: 18,
    emoji: "\u{1F96A}",
    isPreorder: false,
    isVerified: true,
    pickupWindow: "\u0E1E\u0E31\u0E01\u0E01\u0E25\u0E32\u0E07\u0E27\u0E31\u0E19 12:15 - 12:45",
    description: "\u0E02\u0E19\u0E21\u0E1B\u0E31\u0E07\u0E1F\u0E39\u0E19\u0E38\u0E48\u0E21 \u0E44\u0E02\u0E48\u0E15\u0E49\u0E21\u0E41\u0E25\u0E30\u0E19\u0E49\u0E33\u0E2A\u0E25\u0E31\u0E14\u0E42\u0E1A\u0E23\u0E32\u0E13\u0E2A\u0E39\u0E15\u0E23\u0E40\u0E14\u0E47\u0E14 \u0E44\u0E2A\u0E49\u0E41\u0E19\u0E48\u0E19\u0E40\u0E15\u0E47\u0E21\u0E04\u0E33 \u0E17\u0E33\u0E2A\u0E14\u0E15\u0E2D\u0E19\u0E40\u0E0A\u0E49\u0E32"
  },
  {
    id: "p2",
    storeId: "s1",
    storeName: "\u0E21\u0E34\u0E19\u0E15\u0E4C\u0E01\u0E31\u0E1A\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E19",
    title: "\u0E21\u0E34\u0E19\u0E34\u0E1A\u0E23\u0E32\u0E27\u0E19\u0E35\u0E48\u0E2B\u0E19\u0E36\u0E1A\u0E2B\u0E19\u0E31\u0E1A \u0E14\u0E32\u0E23\u0E4C\u0E01\u0E0A\u0E47\u0E2D\u0E01 70%",
    category: "\u0E2D\u0E32\u0E2B\u0E32\u0E23 & \u0E40\u0E1A\u0E40\u0E01\u0E2D\u0E23\u0E35\u0E48",
    price: 25,
    cost: 12,
    stock: 24,
    emoji: "\u{1F36B}",
    isPreorder: false,
    isVerified: true,
    pickupWindow: "\u0E1E\u0E31\u0E01\u0E01\u0E25\u0E32\u0E07\u0E27\u0E31\u0E19 12:15 - 12:45",
    description: "\u0E40\u0E02\u0E49\u0E21\u0E02\u0E49\u0E19 \u0E2B\u0E27\u0E32\u0E19\u0E19\u0E49\u0E2D\u0E22 \u0E2B\u0E19\u0E49\u0E32\u0E1F\u0E34\u0E25\u0E4C\u0E21\u0E01\u0E23\u0E2D\u0E1A \u0E40\u0E19\u0E37\u0E49\u0E2D\u0E0A\u0E38\u0E48\u0E21\u0E09\u0E48\u0E33 \u0E17\u0E32\u0E19\u0E40\u0E22\u0E47\u0E19\u0E22\u0E34\u0E48\u0E07\u0E2D\u0E23\u0E48\u0E2D\u0E22"
  },
  {
    id: "p3",
    storeId: "s1",
    storeName: "\u0E21\u0E34\u0E19\u0E15\u0E4C\u0E01\u0E31\u0E1A\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E19",
    title: "\u0E2A\u0E15\u0E34\u0E01\u0E40\u0E01\u0E2D\u0E23\u0E4C\u0E41\u0E21\u0E27\u0E2A\u0E49\u0E21\u0E44\u0E14\u0E04\u0E31\u0E17\u0E01\u0E31\u0E19\u0E19\u0E49\u0E33 (A6)",
    category: "\u0E07\u0E32\u0E19\u0E04\u0E23\u0E32\u0E1F\u0E15\u0E4C & DIY",
    price: 39,
    cost: 14,
    stock: 35,
    emoji: "\u{1F431}",
    isPreorder: false,
    isVerified: true,
    pickupWindow: "\u0E2B\u0E25\u0E31\u0E07\u0E40\u0E25\u0E34\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19 16:00 - 16:30",
    description: "\u0E2A\u0E15\u0E34\u0E01\u0E40\u0E01\u0E2D\u0E23\u0E4C\u0E40\u0E19\u0E37\u0E49\u0E2D PP \u0E14\u0E49\u0E32\u0E19 \u0E01\u0E31\u0E19\u0E19\u0E49\u0E33 100% \u0E15\u0E34\u0E14\u0E40\u0E04\u0E2A\u0E21\u0E37\u0E2D\u0E16\u0E37\u0E2D\u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E2D\u0E41\u0E1E\u0E14\u0E44\u0E21\u0E48\u0E25\u0E2D\u0E01"
  },
  {
    id: "p4",
    storeId: "s2",
    storeName: "\u0E1F\u0E49\u0E32\u0E17\u0E33\u0E40\u0E2D\u0E07 Handmade",
    title: "\u0E22\u0E32\u0E07\u0E23\u0E31\u0E14\u0E1C\u0E21\u0E1C\u0E49\u0E32\u0E0B\u0E32\u0E15\u0E34\u0E19 \u0E2A\u0E35\u0E1E\u0E32\u0E2A\u0E40\u0E17\u0E25",
    category: "\u0E41\u0E1F\u0E0A\u0E31\u0E48\u0E19 & \u0E02\u0E2D\u0E07\u0E2A\u0E30\u0E2A\u0E21",
    price: 29,
    cost: 9,
    stock: 2,
    // low stock for warning indicator
    emoji: "\u{1F380}",
    isPreorder: false,
    isVerified: true,
    pickupWindow: "\u0E1E\u0E31\u0E01\u0E01\u0E25\u0E32\u0E07\u0E27\u0E31\u0E19 12:15 - 12:45",
    description: "\u0E40\u0E22\u0E47\u0E1A\u0E21\u0E37\u0E2D\u0E17\u0E38\u0E01\u0E0A\u0E34\u0E49\u0E19 \u0E16\u0E19\u0E2D\u0E21\u0E40\u0E2A\u0E49\u0E19\u0E1C\u0E21 \u0E44\u0E21\u0E48\u0E17\u0E33\u0E43\u0E2B\u0E49\u0E1C\u0E21\u0E2B\u0E31\u0E01\u0E07\u0E2D \u0E25\u0E32\u0E22\u0E04\u0E25\u0E32\u0E27\u0E14\u0E4C\u0E1E\u0E32\u0E2A\u0E40\u0E17\u0E25"
  },
  {
    id: "p5",
    storeId: "s2",
    storeName: "\u0E1F\u0E49\u0E32\u0E17\u0E33\u0E40\u0E2D\u0E07 Handmade",
    title: "\u0E1E\u0E27\u0E07\u0E01\u0E38\u0E0D\u0E41\u0E08\u0E25\u0E39\u0E01\u0E1B\u0E31\u0E14 \u0E2A\u0E31\u0E48\u0E07\u0E17\u0E33\u0E0A\u0E37\u0E48\u0E2D\u0E44\u0E14\u0E49",
    category: "\u0E41\u0E1F\u0E0A\u0E31\u0E48\u0E19 & \u0E02\u0E2D\u0E07\u0E2A\u0E30\u0E2A\u0E21",
    price: 45,
    cost: 15,
    stock: 15,
    emoji: "\u2728",
    isPreorder: true,
    isVerified: true,
    pickupWindow: "\u0E2B\u0E25\u0E31\u0E07\u0E40\u0E25\u0E34\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19 16:00 - 16:30",
    description: "\u0E25\u0E39\u0E01\u0E1B\u0E31\u0E14\u0E1E\u0E32\u0E2A\u0E40\u0E17\u0E25\u0E1C\u0E2A\u0E21\u0E25\u0E39\u0E01\u0E1B\u0E31\u0E14\u0E21\u0E38\u0E01 \u0E23\u0E30\u0E1A\u0E38\u0E15\u0E31\u0E27\u0E2D\u0E31\u0E01\u0E29\u0E23\u0E0A\u0E37\u0E48\u0E2D\u0E44\u0E14\u0E49 (1-6 \u0E15\u0E31\u0E27\u0E2D\u0E31\u0E01\u0E29\u0E23)"
  },
  {
    id: "p6",
    storeId: "s3",
    storeName: "\u0E0A\u0E21\u0E23\u0E21\u0E27\u0E31\u0E19\u0E14\u0E35\u0E14\u0E35 Bakery",
    title: "\u0E40\u0E04\u0E49\u0E01\u0E01\u0E25\u0E49\u0E27\u0E22\u0E2B\u0E2D\u0E21\u0E17\u0E2D\u0E07\u0E04\u0E23\u0E35\u0E21\u0E0A\u0E35\u0E2A",
    category: "\u0E2D\u0E32\u0E2B\u0E32\u0E23 & \u0E40\u0E1A\u0E40\u0E01\u0E2D\u0E23\u0E35\u0E48",
    price: 30,
    cost: 16,
    stock: 22,
    emoji: "\u{1F9C1}",
    isPreorder: false,
    isVerified: true,
    pickupWindow: "\u0E1E\u0E31\u0E01\u0E01\u0E25\u0E32\u0E07\u0E27\u0E31\u0E19 12:15 - 12:45",
    description: "\u0E01\u0E25\u0E49\u0E27\u0E22\u0E2B\u0E2D\u0E21\u0E17\u0E2D\u0E07\u0E41\u0E17\u0E49\u0E40\u0E19\u0E49\u0E19 \u0E46 \u0E17\u0E47\u0E2D\u0E1B\u0E14\u0E49\u0E27\u0E22\u0E2A\u0E40\u0E27\u0E34\u0E23\u0E4C\u0E25\u0E04\u0E23\u0E35\u0E21\u0E0A\u0E35\u0E2A\u0E2A\u0E39\u0E15\u0E23\u0E40\u0E02\u0E49\u0E21\u0E02\u0E49\u0E19 \u0E2B\u0E2D\u0E21\u0E25\u0E30\u0E21\u0E38\u0E19"
  },
  {
    id: "p7",
    storeId: "s3",
    storeName: "\u0E0A\u0E21\u0E23\u0E21\u0E27\u0E31\u0E19\u0E14\u0E35\u0E14\u0E35 Bakery",
    title: "\u0E04\u0E38\u0E01\u0E01\u0E35\u0E49\u0E02\u0E49\u0E32\u0E27\u0E42\u0E2D\u0E4A\u0E15\u0E41\u0E04\u0E23\u0E19\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E23\u0E35\u0E48 \u0E2B\u0E27\u0E32\u0E19\u0E19\u0E49\u0E2D\u0E22",
    category: "\u0E2D\u0E32\u0E2B\u0E32\u0E23 & \u0E40\u0E1A\u0E40\u0E01\u0E2D\u0E23\u0E35\u0E48",
    price: 25,
    cost: 13,
    stock: 0,
    // sold out
    emoji: "\u{1F36A}",
    isPreorder: true,
    isVerified: true,
    pickupWindow: "\u0E1E\u0E31\u0E01\u0E01\u0E25\u0E32\u0E07\u0E27\u0E31\u0E19 12:15 - 12:45",
    description: "\u0E43\u0E0A\u0E49\u0E40\u0E19\u0E22\u0E2A\u0E14\u0E41\u0E17\u0E49 \u0E41\u0E04\u0E23\u0E19\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E23\u0E35\u0E48\u0E40\u0E1B\u0E23\u0E35\u0E49\u0E22\u0E27\u0E2B\u0E27\u0E32\u0E19\u0E25\u0E07\u0E15\u0E31\u0E27 \u0E44\u0E1F\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E2A\u0E39\u0E07"
  },
  {
    id: "p8",
    storeId: "s4",
    storeName: "Craft & Clay \u0E42\u0E14\u0E22 \u0E01\u0E32\u0E19\u0E15\u0E4C",
    title: "\u0E08\u0E32\u0E19\u0E23\u0E2D\u0E07\u0E41\u0E01\u0E49\u0E27\u0E40\u0E23\u0E0B\u0E34\u0E48\u0E19 \u0E25\u0E32\u0E22\u0E2B\u0E34\u0E19\u0E2D\u0E48\u0E2D\u0E19\u0E17\u0E2D\u0E07",
    category: "\u0E07\u0E32\u0E19\u0E04\u0E23\u0E32\u0E1F\u0E15\u0E4C & DIY",
    price: 59,
    cost: 22,
    stock: 8,
    emoji: "\u{1F3A8}",
    isPreorder: false,
    isVerified: false,
    pickupWindow: "\u0E2B\u0E25\u0E31\u0E07\u0E40\u0E25\u0E34\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19 16:00 - 16:30",
    description: "\u0E01\u0E31\u0E19\u0E19\u0E49\u0E33 \u0E41\u0E02\u0E47\u0E07\u0E41\u0E23\u0E07\u0E17\u0E19\u0E17\u0E32\u0E19 \u0E41\u0E15\u0E48\u0E07\u0E25\u0E32\u0E22\u0E1B\u0E23\u0E30\u0E01\u0E32\u0E22\u0E17\u0E2D\u0E07\u0E2B\u0E23\u0E39\u0E2B\u0E23\u0E32 \u0E27\u0E32\u0E07\u0E1A\u0E19\u0E42\u0E15\u0E4A\u0E30\u0E40\u0E23\u0E35\u0E22\u0E19\u0E40\u0E01\u0E4B \u0E46"
  }
];
var INITIAL_ORDERS = [
  {
    id: "ORD-1001",
    code: "7829",
    buyerId: "student2",
    buyerName: "\u0E1B\u0E31\u0E19 (\u0E21.4/1)",
    storeId: "s1",
    storeName: "\u0E21\u0E34\u0E19\u0E15\u0E4C\u0E01\u0E31\u0E1A\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E19",
    items: [{ id: "p1", title: "\u0E41\u0E0B\u0E19\u0E14\u0E4C\u0E27\u0E34\u0E0A\u0E44\u0E02\u0E48\u0E42\u0E1A\u0E23\u0E32\u0E13\u0E44\u0E2A\u0E49\u0E17\u0E30\u0E25\u0E31\u0E01", price: 35, cost: 18, qty: 2 }],
    total: 70,
    status: "ready",
    // pending | preparing | ready | completed
    isPreorder: false,
    pickupLocation: "\u0E42\u0E23\u0E07\u0E2D\u0E32\u0E2B\u0E32\u0E23\u0E01\u0E25\u0E32\u0E07 (\u0E40\u0E2A\u0E32\u0E15\u0E49\u0E19\u0E17\u0E35\u0E48 4)",
    pickupWindow: "\u0E1E\u0E31\u0E01\u0E01\u0E25\u0E32\u0E07\u0E27\u0E31\u0E19 12:15 - 12:45",
    date: "2026-11-09T10:30:00Z"
  },
  {
    id: "ORD-1002",
    code: "4512",
    buyerId: "student4",
    buyerName: "\u0E15\u0E49\u0E19 (\u0E21.4/2)",
    storeId: "s1",
    storeName: "\u0E21\u0E34\u0E19\u0E15\u0E4C\u0E01\u0E31\u0E1A\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E19",
    items: [{ id: "p2", title: "\u0E21\u0E34\u0E19\u0E34\u0E1A\u0E23\u0E32\u0E27\u0E19\u0E35\u0E48\u0E2B\u0E19\u0E36\u0E1A\u0E2B\u0E19\u0E31\u0E1A \u0E14\u0E32\u0E23\u0E4C\u0E01\u0E0A\u0E47\u0E2D\u0E01 70%", price: 25, cost: 12, qty: 1 }],
    total: 25,
    status: "preparing",
    isPreorder: false,
    pickupLocation: "\u0E42\u0E23\u0E07\u0E2D\u0E32\u0E2B\u0E32\u0E23\u0E01\u0E25\u0E32\u0E07 (\u0E40\u0E2A\u0E32\u0E15\u0E49\u0E19\u0E17\u0E35\u0E48 4)",
    pickupWindow: "\u0E1E\u0E31\u0E01\u0E01\u0E25\u0E32\u0E07\u0E27\u0E31\u0E19 12:15 - 12:45",
    date: "2026-11-09T10:45:00Z"
  },
  {
    id: "ORD-1003",
    code: "9034",
    buyerId: "student1",
    buyerName: "\u0E21\u0E34\u0E19\u0E15\u0E4C (\u0E21.4/1)",
    storeId: "s2",
    storeName: "\u0E1F\u0E49\u0E32\u0E17\u0E33\u0E40\u0E2D\u0E07 Handmade",
    items: [{ id: "p4", title: "\u0E22\u0E32\u0E07\u0E23\u0E31\u0E14\u0E1C\u0E21\u0E1C\u0E49\u0E32\u0E0B\u0E32\u0E15\u0E34\u0E19 \u0E2A\u0E35\u0E1E\u0E32\u0E2A\u0E40\u0E17\u0E25", price: 29, cost: 9, qty: 1 }],
    total: 29,
    status: "completed",
    isPreorder: false,
    pickupLocation: "\u0E2D\u0E32\u0E04\u0E32\u0E23 3 \u0E0A\u0E31\u0E49\u0E19 1 (\u0E43\u0E15\u0E49\u0E15\u0E36\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19)",
    pickupWindow: "\u0E2B\u0E25\u0E31\u0E07\u0E40\u0E25\u0E34\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19 16:00 - 16:30",
    date: "2026-11-08T16:15:00Z"
  }
];
var INITIAL_TELEMETRY = [
  {
    studentId: "student1",
    studentName: "\u0E21\u0E34\u0E19\u0E15\u0E4C",
    avatar: "\u{1F469}\u{1F3FB}",
    storeName: "\u0E21\u0E34\u0E19\u0E15\u0E4C\u0E01\u0E31\u0E1A\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E19",
    classId: "c1",
    priceAdjustments: 3,
    adjustmentHistory: [
      { date: "7 \u0E1E.\u0E22.", oldPrice: 30, newPrice: 35, reason: "\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E44\u0E02\u0E48\u0E41\u0E25\u0E30\u0E41\u0E1E\u0E47\u0E01\u0E40\u0E01\u0E08\u0E08\u0E34\u0E49\u0E07\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19" },
      { date: "5 \u0E1E.\u0E22.", oldPrice: 20, newPrice: 25, reason: "\u0E1B\u0E23\u0E31\u0E1A\u0E02\u0E19\u0E32\u0E14\u0E1A\u0E23\u0E32\u0E27\u0E19\u0E35\u0E48\u0E43\u0E2B\u0E0D\u0E48\u0E02\u0E36\u0E49\u0E19" }
    ],
    stockAccuracy: 95,
    deadStockCount: 1,
    riskProfile: "Balanced Growth",
    // 'Aggressive Pricing' | 'Risk Averse' | 'Balanced Growth'
    totalRevenue: 2840,
    netProfit: 1320
  },
  {
    studentId: "student3",
    studentName: "\u0E1F\u0E49\u0E32",
    avatar: "\u{1F469}\u{1F3FD}",
    storeName: "\u0E1F\u0E49\u0E32\u0E17\u0E33\u0E40\u0E2D\u0E07 Handmade",
    classId: "c1",
    priceAdjustments: 5,
    adjustmentHistory: [
      { date: "8 \u0E1E.\u0E22.", oldPrice: 35, newPrice: 45, reason: "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E04\u0E31\u0E2A\u0E15\u0E2D\u0E21\u0E15\u0E31\u0E27\u0E2D\u0E31\u0E01\u0E29\u0E23\u0E0A\u0E37\u0E48\u0E2D" },
      { date: "6 \u0E1E.\u0E22.", oldPrice: 25, newPrice: 29, reason: "\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E43\u0E0A\u0E49\u0E1C\u0E49\u0E32\u0E0B\u0E32\u0E15\u0E34\u0E19\u0E40\u0E01\u0E23\u0E14\u0E2B\u0E19\u0E32" }
    ],
    stockAccuracy: 88,
    deadStockCount: 3,
    riskProfile: "Aggressive Pricing",
    totalRevenue: 1780,
    netProfit: 940
  },
  {
    studentId: "student4",
    studentName: "\u0E15\u0E49\u0E19",
    avatar: "\u{1F468}\u{1F3FB}",
    storeName: "\u0E0A\u0E21\u0E23\u0E21\u0E27\u0E31\u0E19\u0E14\u0E35\u0E14\u0E35 Bakery",
    classId: "c2",
    priceAdjustments: 1,
    adjustmentHistory: [
      { date: "6 \u0E1E.\u0E22.", oldPrice: 28, newPrice: 30, reason: "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E17\u0E47\u0E2D\u0E1B\u0E1B\u0E34\u0E49\u0E07\u0E04\u0E23\u0E35\u0E21\u0E0A\u0E35\u0E2A\u0E41\u0E17\u0E49" }
    ],
    stockAccuracy: 98,
    deadStockCount: 0,
    riskProfile: "Risk Averse",
    totalRevenue: 2200,
    netProfit: 860
  },
  {
    studentId: "student6",
    studentName: "\u0E01\u0E32\u0E19\u0E15\u0E4C",
    avatar: "\u{1F466}\u{1F3FC}",
    storeName: "Craft & Clay",
    classId: "c2",
    priceAdjustments: 4,
    adjustmentHistory: [
      { date: "7 \u0E1E.\u0E22.", oldPrice: 65, newPrice: 59, reason: "\u0E25\u0E14\u0E23\u0E32\u0E04\u0E32\u0E14\u0E36\u0E07\u0E14\u0E39\u0E14\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E1B\u0E34\u0E14\u0E23\u0E49\u0E32\u0E19" }
    ],
    stockAccuracy: 80,
    deadStockCount: 5,
    riskProfile: "Aggressive Pricing",
    totalRevenue: 1250,
    netProfit: 450
  }
];
var INITIAL_ASSIGNMENTS = [
  {
    id: "a1",
    classId: "c1",
    title: "\u0E20\u0E32\u0E23\u0E01\u0E34\u0E08\u0E17\u0E35\u0E48 1: \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E41\u0E25\u0E30\u0E08\u0E38\u0E14\u0E04\u0E38\u0E49\u0E21\u0E17\u0E38\u0E19\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32\u0E15\u0E31\u0E27\u0E41\u0E23\u0E01",
    description: "\u0E04\u0E33\u0E19\u0E27\u0E13\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E01\u0E32\u0E23\u0E1C\u0E25\u0E34\u0E15\u0E08\u0E23\u0E34\u0E07\u0E41\u0E25\u0E30\u0E02\u0E2D\u0E07\u0E40\u0E2A\u0E35\u0E22 \u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E23\u0E30\u0E1A\u0E38\u0E08\u0E33\u0E19\u0E27\u0E19\u0E0A\u0E34\u0E49\u0E19\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E02\u0E32\u0E22\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E43\u0E2B\u0E49\u0E16\u0E36\u0E07\u0E08\u0E38\u0E14\u0E04\u0E38\u0E49\u0E21\u0E17\u0E38\u0E19 (Break-even Point)",
    due: "2026-11-20",
    submissionsCount: 8,
    totalStudents: 12
  },
  {
    id: "a2",
    classId: "c1",
    title: "\u0E20\u0E32\u0E23\u0E01\u0E34\u0E08\u0E17\u0E35\u0E48 2: \u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19\u0E42\u0E1B\u0E23\u0E42\u0E21\u0E0A\u0E31\u0E48\u0E19\u0E25\u0E14\u0E02\u0E2D\u0E07\u0E40\u0E2A\u0E35\u0E22\u0E0A\u0E48\u0E27\u0E07\u0E17\u0E49\u0E32\u0E22\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C",
    description: "\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E2A\u0E48\u0E27\u0E19\u0E25\u0E14\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32\u0E04\u0E49\u0E32\u0E07\u0E2A\u0E15\u0E47\u0E2D\u0E01\u0E2B\u0E23\u0E37\u0E2D\u0E08\u0E31\u0E14\u0E0A\u0E38\u0E14\u0E04\u0E39\u0E48 \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19 Dead Stock \u0E43\u0E19\u0E42\u0E23\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19",
    due: "2026-11-25",
    submissionsCount: 4,
    totalStudents: 12
  }
];
var AppContext = createContext();
function AppProvider({ children }) {
  const STORAGE_KEY = "edumarket_v2_hifi_state";
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Could not load from localStorage:", e);
    }
    return {
      mode: "buyer",
      // 'buyer' | 'seller' | 'teacher'
      selectedClassId: "c1",
      products: INITIAL_PRODUCTS,
      stores: INITIAL_STORES,
      orders: INITIAL_ORDERS,
      telemetry: INITIAL_TELEMETRY,
      assignments: INITIAL_ASSIGNMENTS,
      cart: [],
      lessons: {
        // Quest 1: Cost & Waste
        costLesson: {
          completed: false,
          batchCost: 350,
          producedUnits: 20,
          wastedUnits: 2,
          unitCost: 19.44
        },
        // Quest 2: Break-Even
        pricingLesson: {
          completed: false,
          fixedCost: 120,
          unitCost: 19.44,
          sellingPrice: 35,
          breakEvenUnits: 8
        }
      }
    };
  });
  const [toasts, setToasts] = useState([]);
  const [syncStatus, setSyncStatus] = useState({
    status: "syncing",
    // 'synced' | 'syncing' | 'offline' | 'error'
    lastSync: null,
    isCloud: true,
    error: null
  });
  const isHydratedRef = useRef(false);
  const syncTimeoutRef = useRef(null);
  const isSyncingRef = useRef(false);
  const showToast = (message, type = "success") => {
    const id = Date.now() + Math.random().toString(36).slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };
  useEffect(() => {
    let isMounted = true;
    async function initialHydrate() {
      try {
        const [healthRes, stateRes] = await Promise.all([
          fetch("/api/health").catch(() => null),
          fetch("/api/state").catch(() => null)
        ]);
        let isCloud = true;
        if (healthRes && healthRes.ok) {
          const health = await healthRes.json();
          isCloud = health.database === "supabase_cloud";
        }
        if (stateRes && stateRes.ok && isMounted) {
          const cloud = await stateRes.json();
          setState((prev) => {
            const mergedProducts = Array.isArray(cloud.products) && cloud.products.length > 0 ? cloud.products : prev.products;
            const mergedStores = Array.isArray(cloud.stores) && cloud.stores.length > 0 ? cloud.stores : Array.isArray(cloud.shops) && cloud.shops.length > 0 ? cloud.shops : prev.stores;
            const mergedOrders = Array.isArray(cloud.orders) && cloud.orders.length > 0 ? cloud.orders : prev.orders;
            const mergedAssignments = Array.isArray(cloud.assignments) && cloud.assignments.length > 0 ? cloud.assignments : prev.assignments;
            const mergedLessons = cloud.lessons || prev.lessons;
            return {
              ...prev,
              products: mergedProducts,
              stores: mergedStores,
              orders: mergedOrders,
              assignments: mergedAssignments,
              lessons: mergedLessons
            };
          });
          const nowStr = (/* @__PURE__ */ new Date()).toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
          setSyncStatus({
            status: "synced",
            lastSync: nowStr,
            isCloud,
            error: null
          });
          showToast(isCloud ? "\u0E0B\u0E34\u0E07\u0E04\u0E4C\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E01\u0E31\u0E1A Supabase Cloud \u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34\u0E41\u0E25\u0E49\u0E27 \u2601\uFE0F" : "\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E15\u0E48\u0E2D\u0E10\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22\u0E41\u0E25\u0E49\u0E27 \u2728", "info");
        }
      } catch (err) {
        console.warn("[EduMarket Auto-Sync] Initial fetch failed:", err);
        if (isMounted) {
          setSyncStatus({
            status: "offline",
            lastSync: null,
            isCloud: false,
            error: err.message
          });
        }
      } finally {
        if (isMounted) {
          isHydratedRef.current = true;
        }
      }
    }
    initialHydrate();
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
    }
    if (!isHydratedRef.current) return;
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }
    setSyncStatus((prev) => ({ ...prev, status: "syncing" }));
    syncTimeoutRef.current = setTimeout(async () => {
      try {
        isSyncingRef.current = true;
        const res = await fetch("/api/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ state })
        });
        if (res.ok) {
          const nowStr = (/* @__PURE__ */ new Date()).toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
          setSyncStatus((prev) => ({
            ...prev,
            status: "synced",
            lastSync: nowStr,
            error: null
          }));
        } else {
          throw new Error(`Sync returned ${res.status}`);
        }
      } catch (err) {
        console.warn("[EduMarket Auto-Sync] Sync failed:", err.message);
        setSyncStatus((prev) => ({
          ...prev,
          status: "error",
          error: err.message
        }));
      } finally {
        isSyncingRef.current = false;
      }
    }, 600);
    return () => {
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    };
  }, [state.products, state.orders, state.assignments, state.lessons, state.stores]);
  useEffect(() => {
    const interval = setInterval(async () => {
      if (isSyncingRef.current || !isHydratedRef.current || document.hidden) return;
      try {
        const res = await fetch("/api/state");
        if (res.ok) {
          const cloud = await res.json();
          setState((prev) => {
            let changed = false;
            let nextOrders = prev.orders;
            if (Array.isArray(cloud.orders)) {
              if (cloud.orders.length !== prev.orders.length) {
                nextOrders = cloud.orders;
                changed = true;
              } else {
                const prevMap = new Map(prev.orders.map((o) => [o.id, o.status]));
                for (const ro of cloud.orders) {
                  if (prevMap.get(ro.id) !== ro.status) {
                    nextOrders = cloud.orders;
                    changed = true;
                    break;
                  }
                }
              }
            }
            let nextProducts = prev.products;
            if (Array.isArray(cloud.products) && cloud.products.length !== prev.products.length) {
              nextProducts = cloud.products;
              changed = true;
            }
            let nextAssignments = prev.assignments;
            if (Array.isArray(cloud.assignments) && cloud.assignments.length !== prev.assignments.length) {
              nextAssignments = cloud.assignments;
              changed = true;
            }
            if (!changed) return prev;
            return {
              ...prev,
              orders: nextOrders,
              products: nextProducts,
              assignments: nextAssignments
            };
          });
          const nowStr = (/* @__PURE__ */ new Date()).toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
          setSyncStatus((prev) => ({ ...prev, status: "synced", lastSync: nowStr }));
        }
      } catch (e) {
      }
    }, 4500);
    return () => clearInterval(interval);
  }, []);
  const triggerManualSync = async () => {
    setSyncStatus((prev) => ({ ...prev, status: "syncing" }));
    try {
      const res = await fetch("/api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state })
      });
      if (res.ok) {
        const stateRes = await fetch("/api/state");
        if (stateRes.ok) {
          const fresh = await stateRes.json();
          setState((prev) => ({
            ...prev,
            products: Array.isArray(fresh.products) && fresh.products.length ? fresh.products : prev.products,
            orders: Array.isArray(fresh.orders) && fresh.orders.length ? fresh.orders : prev.orders,
            assignments: Array.isArray(fresh.assignments) && fresh.assignments.length ? fresh.assignments : prev.assignments,
            stores: Array.isArray(fresh.stores) && fresh.stores.length ? fresh.stores : prev.stores
          }));
        }
        const nowStr = (/* @__PURE__ */ new Date()).toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
        setSyncStatus({ status: "synced", lastSync: nowStr, isCloud: true, error: null });
        showToast("\u0E0B\u0E34\u0E07\u0E04\u0E4C\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14\u0E01\u0E31\u0E1A Supabase Cloud \u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22\u0E41\u0E25\u0E49\u0E27 \u2601\uFE0F", "success");
      } else {
        throw new Error(`Sync returned ${res.status}`);
      }
    } catch (e) {
      setSyncStatus((prev) => ({ ...prev, status: "error", error: e.message }));
      showToast("\u0E01\u0E32\u0E23\u0E0B\u0E34\u0E07\u0E04\u0E4C\u0E02\u0E31\u0E14\u0E02\u0E49\u0E2D\u0E07: " + e.message, "error");
    }
  };
  const setMode = (mode) => {
    setState((prev) => ({ ...prev, mode }));
    const titles = {
      buyer: "\u0E2A\u0E25\u0E31\u0E1A\u0E2A\u0E39\u0E48\u0E42\u0E2B\u0E21\u0E14 \u{1F9D1}\u200D\u{1F393} \u0E19\u0E31\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19 (\u0E1C\u0E39\u0E49\u0E0B\u0E37\u0E49\u0E2D)",
      seller: "\u0E2A\u0E25\u0E31\u0E1A\u0E2A\u0E39\u0E48\u0E42\u0E2B\u0E21\u0E14 \u{1F3EA} \u0E19\u0E31\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19 (\u0E1C\u0E39\u0E49\u0E02\u0E32\u0E22 / \u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E23\u0E49\u0E32\u0E19)",
      teacher: "\u0E2A\u0E25\u0E31\u0E1A\u0E2A\u0E39\u0E48\u0E42\u0E2B\u0E21\u0E14 \u{1F468}\u200D\u{1F3EB} \u0E04\u0E38\u0E13\u0E04\u0E23\u0E39 (Educator Telemetry)"
    };
    showToast(titles[mode] || "\u0E2A\u0E25\u0E31\u0E1A\u0E42\u0E2B\u0E21\u0E14\u0E41\u0E25\u0E49\u0E27", "info");
  };
  const resetDemoData = async () => {
    const freshState = {
      mode: "buyer",
      selectedClassId: "c1",
      products: INITIAL_PRODUCTS,
      stores: INITIAL_STORES,
      orders: INITIAL_ORDERS,
      telemetry: INITIAL_TELEMETRY,
      assignments: INITIAL_ASSIGNMENTS,
      cart: [],
      lessons: {
        costLesson: {
          completed: false,
          batchCost: 350,
          producedUnits: 20,
          wastedUnits: 2,
          unitCost: 19.44
        },
        pricingLesson: {
          completed: false,
          fixedCost: 120,
          unitCost: 19.44,
          sellingPrice: 35,
          breakEvenUnits: 8
        }
      }
    };
    setState(freshState);
    localStorage.removeItem(STORAGE_KEY);
    showToast("\u0E23\u0E35\u0E40\u0E0B\u0E47\u0E15\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E14\u0E2A\u0E2D\u0E1A\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22\u0E41\u0E25\u0E49\u0E27 \u2728", "info");
    try {
      await fetch("/api/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: freshState })
      });
    } catch (e) {
    }
  };
  const addToCart = (product) => {
    setState((prev) => {
      const existing = prev.cart.find((item) => item.product.id === product.id);
      let updated;
      if (existing) {
        updated = prev.cart.map(
          (item) => item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        updated = [...prev.cart, { product, qty: 1 }];
      }
      return { ...prev, cart: updated };
    });
    showToast(`\u0E40\u0E1E\u0E34\u0E48\u0E21 "${product.title}" \u0E25\u0E07\u0E15\u0E30\u0E01\u0E23\u0E49\u0E32\u0E41\u0E25\u0E49\u0E27 \u{1F6D2}`);
  };
  const updateCartQty = (productId, delta) => {
    setState((prev) => {
      const updated = prev.cart.map((item) => {
        if (item.product.id === productId) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : null;
        }
        return item;
      }).filter(Boolean);
      return { ...prev, cart: updated };
    });
  };
  const clearCart = () => {
    setState((prev) => ({ ...prev, cart: [] }));
  };
  const placeOrder = ({ isPreorder, pickupLocation, pickupWindow }) => {
    if (state.cart.length === 0) return null;
    const pickupCode = Math.floor(1e3 + Math.random() * 9e3).toString();
    const orderId = `ORD-${Date.now().toString().slice(-4)}`;
    const items = state.cart.map((i) => ({
      id: i.product.id,
      title: i.product.title,
      price: i.product.price,
      cost: i.product.cost,
      qty: i.qty
    }));
    const total = state.cart.reduce((sum, i) => sum + i.product.price * i.qty, 0);
    const primaryStore = state.stores.find((s) => s.id === state.cart[0].product.storeId) || state.stores[0];
    const newOrder = {
      id: orderId,
      code: pickupCode,
      buyerId: "student2",
      buyerName: "\u0E1B\u0E31\u0E19 (\u0E21.4/1)",
      storeId: primaryStore.id,
      storeName: primaryStore.name,
      items,
      total,
      status: "pending",
      // pending -> preparing -> ready -> completed
      isPreorder,
      pickupLocation,
      pickupWindow,
      date: (/* @__PURE__ */ new Date()).toISOString()
    };
    setState((prev) => {
      const updatedProducts = prev.products.map((p) => {
        const ordered = state.cart.find((ci) => ci.product.id === p.id);
        if (ordered && !isPreorder) {
          return { ...p, stock: Math.max(0, p.stock - ordered.qty) };
        }
        return p;
      });
      return {
        ...prev,
        orders: [newOrder, ...prev.orders],
        products: updatedProducts,
        cart: []
      };
    });
    showToast(`\u0E2A\u0E31\u0E48\u0E07\u0E0B\u0E37\u0E49\u0E2D\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08! \u0E23\u0E2B\u0E31\u0E2A\u0E23\u0E31\u0E1A\u0E02\u0E2D\u0E07: #${pickupCode} \u{1F39F}\uFE0F`, "success");
    return newOrder;
  };
  const updateOrderStatus = (orderId, status) => {
    setState((prev) => ({
      ...prev,
      orders: prev.orders.map((o) => o.id === orderId ? { ...o, status } : o)
    }));
    const statusLabels = {
      preparing: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32 \u{1F373}",
      ready: "\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E43\u0E2B\u0E49\u0E23\u0E31\u0E1A\u0E02\u0E2D\u0E07\u0E41\u0E25\u0E49\u0E27 \u{1F4E6}",
      completed: "\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E23\u0E31\u0E1A\u0E02\u0E2D\u0E07\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08\u0E41\u0E25\u0E49\u0E27 \u2705"
    };
    showToast(statusLabels[status] || "\u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E0B\u0E37\u0E49\u0E2D\u0E41\u0E25\u0E49\u0E27");
  };
  const verifyPickupCode = (orderId, enteredCode) => {
    const order = state.orders.find((o) => o.id === orderId);
    if (!order) return { success: false, message: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E0B\u0E37\u0E49\u0E2D" };
    if (order.code === enteredCode.trim()) {
      updateOrderStatus(orderId, "completed");
      showToast(`\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E23\u0E2B\u0E31\u0E2A\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07! \u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E0B\u0E37\u0E49\u0E2D #${order.id} \u0E2A\u0E48\u0E07\u0E21\u0E2D\u0E1A\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22 \u{1F389}`, "success");
      return { success: true };
    } else {
      showToast("\u0E23\u0E2B\u0E31\u0E2A\u0E23\u0E31\u0E1A\u0E02\u0E2D\u0E07\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E2D\u0E35\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07 \u274C", "error");
      return { success: false, message: "\u0E23\u0E2B\u0E31\u0E2A\u0E23\u0E31\u0E1A\u0E02\u0E2D\u0E07\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07" };
    }
  };
  const saveLesson1 = ({ batchCost, producedUnits, wastedUnits, unitCost }) => {
    setState((prev) => ({
      ...prev,
      lessons: {
        ...prev.lessons,
        costLesson: {
          completed: true,
          batchCost,
          producedUnits,
          wastedUnits,
          unitCost
        },
        pricingLesson: {
          ...prev.lessons.pricingLesson,
          unitCost
          // Sync variable cost to Lesson 2!
        }
      }
    }));
    showToast("\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E1A\u0E17\u0E40\u0E23\u0E35\u0E22\u0E19\u0E17\u0E35\u0E48 1: \u0E04\u0E33\u0E19\u0E27\u0E13\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E15\u0E48\u0E2D\u0E0A\u0E34\u0E49\u0E19\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22! \u{1FA99}");
  };
  const saveLesson2 = ({ fixedCost, unitCost, sellingPrice, breakEvenUnits }) => {
    setState((prev) => ({
      ...prev,
      lessons: {
        ...prev.lessons,
        pricingLesson: {
          completed: true,
          fixedCost,
          unitCost,
          sellingPrice,
          breakEvenUnits
        }
      }
    }));
    showToast("\u0E1C\u0E48\u0E32\u0E19\u0E1A\u0E17\u0E40\u0E23\u0E35\u0E22\u0E19\u0E17\u0E35\u0E48 2! \u0E1B\u0E25\u0E14\u0E25\u0E47\u0E2D\u0E01\u0E01\u0E32\u0E23\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32\u0E43\u0E19\u0E23\u0E49\u0E32\u0E19\u0E04\u0E49\u0E32\u0E41\u0E25\u0E49\u0E27 \u{1F389}");
  };
  const addProduct = (productData) => {
    const newProduct = {
      id: `p_${Date.now()}`,
      storeId: "s1",
      // current student store (Mint & Friends)
      storeName: "\u0E21\u0E34\u0E19\u0E15\u0E4C\u0E01\u0E31\u0E1A\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E19",
      isVerified: true,
      ...productData
    };
    setState((prev) => ({
      ...prev,
      products: [newProduct, ...prev.products]
    }));
    setState((prev) => ({
      ...prev,
      telemetry: prev.telemetry.map((t) => {
        if (t.studentId === "student1") {
          return {
            ...t,
            priceAdjustments: t.priceAdjustments + 1,
            adjustmentHistory: [
              {
                date: "\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49",
                oldPrice: 0,
                newPrice: productData.price,
                reason: `\u0E40\u0E1B\u0E34\u0E14\u0E02\u0E32\u0E22\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32\u0E43\u0E2B\u0E21\u0E48: ${productData.title} (\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E04\u0E33\u0E19\u0E27\u0E13 ${productData.cost}\u0E3F)`
              },
              ...t.adjustmentHistory
            ]
          };
        }
        return t;
      })
    }));
    showToast(`\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32 "${newProduct.title}" \u0E40\u0E1B\u0E34\u0E14\u0E02\u0E32\u0E22\u0E43\u0E19\u0E15\u0E25\u0E32\u0E14\u0E41\u0E25\u0E49\u0E27 \u{1F680}`);
  };
  const createAssignment = ({ title, description, due, classId }) => {
    const newAssign = {
      id: `a_${Date.now()}`,
      classId: classId || state.selectedClassId,
      title,
      description,
      due,
      submissionsCount: 0,
      totalStudents: 12
    };
    setState((prev) => ({
      ...prev,
      assignments: [newAssign, ...prev.assignments]
    }));
    showToast(`\u0E21\u0E2D\u0E1A\u0E2B\u0E21\u0E32\u0E22\u0E20\u0E32\u0E23\u0E01\u0E34\u0E08\u0E43\u0E2B\u0E21\u0E48 "${title}" \u0E43\u0E2B\u0E49\u0E2B\u0E49\u0E2D\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19\u0E41\u0E25\u0E49\u0E27 \u{1F4CB}`);
  };
  const isStoreUnlocked = state.lessons.costLesson.completed && state.lessons.pricingLesson.completed;
  return /* @__PURE__ */ React.createElement(
    AppContext.Provider,
    {
      value: {
        ...state,
        setMode,
        resetDemoData,
        addToCart,
        updateCartQty,
        clearCart,
        placeOrder,
        updateOrderStatus,
        verifyPickupCode,
        saveLesson1,
        saveLesson2,
        addProduct,
        createAssignment,
        isStoreUnlocked,
        showToast,
        syncStatus,
        triggerManualSync,
        setSelectedClassId: (id) => setState((p) => ({ ...p, selectedClassId: id }))
      }
    },
    children,
    /* @__PURE__ */ React.createElement("div", { className: "fixed bottom-5 right-5 z-[100] flex flex-col gap-2 pointer-events-none" }, toasts.map((toast) => /* @__PURE__ */ React.createElement(
      "div",
      {
        key: toast.id,
        className: `pointer-events-auto px-4 py-3 rounded-xl shadow-xl border text-sm font-medium flex items-center gap-3 animate-pop-in ${toast.type === "error" ? "bg-red-900/90 text-red-100 border-red-700 backdrop-blur-md" : toast.type === "info" ? "bg-slate-900/90 text-cyan-200 border-cyan-800 backdrop-blur-md" : "bg-slate-900/95 text-emerald-300 border-emerald-500/40 backdrop-blur-md"}`
      },
      /* @__PURE__ */ React.createElement("span", { className: "text-base" }, toast.type === "error" ? "\u26A0\uFE0F" : toast.type === "info" ? "\u2139\uFE0F" : "\u2728"),
      /* @__PURE__ */ React.createElement("span", null, toast.message)
    )))
  );
}
function useEdu() {
  return useContext(AppContext);
}
function QRCodeSVG({ value = "", size = 140 }) {
  const modules = useMemo(() => {
    const N2 = 21;
    const matrix = Array(N2).fill(null).map(() => Array(N2).fill(false));
    const placeFinder = (r, c) => {
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          if (i === 0 || i === 6 || j === 0 || j === 6 || // Outer ring
          i >= 2 && i <= 4 && j >= 2 && j <= 4) {
            matrix[r + i][c + j] = true;
          }
        }
      }
    };
    placeFinder(0, 0);
    placeFinder(0, N2 - 7);
    placeFinder(N2 - 7, 0);
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = (hash << 5) - hash + value.charCodeAt(i);
      hash |= 0;
    }
    for (let r = 0; r < N2; r++) {
      for (let c = 0; c < N2; c++) {
        if (r < 8 && c < 8 || r < 8 && c >= N2 - 8 || r >= N2 - 8 && c < 8) continue;
        const seed = r * 31 + c * 17 + hash & 255;
        if (seed % 3 === 0 || (r + c) % 4 === 0) {
          matrix[r][c] = true;
        }
      }
    }
    return matrix;
  }, [value]);
  const N = 21;
  const cellSize = size / N;
  return /* @__PURE__ */ React.createElement("svg", { width: size, height: size, viewBox: `0 0 ${size} ${size}`, className: "bg-white p-2 rounded-xl shadow-inner border border-slate-200" }, modules.map(
    (row, r) => row.map(
      (cell, c) => cell ? /* @__PURE__ */ React.createElement(
        "rect",
        {
          key: `${r}-${c}`,
          x: c * cellSize,
          y: r * cellSize,
          width: cellSize + 0.3,
          height: cellSize + 0.3,
          fill: "#0f172a"
        }
      ) : null
    )
  ));
}
function TopRoleSwitcher() {
  const { mode, setMode, resetDemoData, cart, syncStatus, triggerManualSync } = useEdu();
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("aside", { "aria-label": "\u0E41\u0E16\u0E1A\u0E04\u0E27\u0E1A\u0E04\u0E38\u0E21\u0E1A\u0E17\u0E1A\u0E32\u0E17\u0E41\u0E25\u0E30\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E23\u0E30\u0E1A\u0E1A", className: "sticky top-0 z-50 w-full glass-nav border-b border-slate-800 text-slate-100 shadow-xl px-4 py-2.5" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2.5" }, /* @__PURE__ */ React.createElement("span", { className: "w-8 h-8 rounded-lg bg-brand-lime text-slate-950 font-black flex items-center justify-center text-sm tracking-tighter shadow-sm" }, "em"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col" }, /* @__PURE__ */ React.createElement("span", { className: "text-sm font-bold tracking-tight text-white flex items-center gap-1.5" }, "EduMarket", /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" }, "Prototype")), /* @__PURE__ */ React.createElement("span", { className: "text-[11px] text-slate-400" }, mode === "buyer" && "\u0E42\u0E2B\u0E21\u0E14\u0E19\u0E31\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19: \u0E2A\u0E31\u0E48\u0E07\u0E0B\u0E37\u0E49\u0E2D\u0E41\u0E25\u0E30\u0E19\u0E31\u0E14\u0E23\u0E31\u0E1A\u0E02\u0E2D\u0E07", mode === "seller" && "\u0E42\u0E2B\u0E21\u0E14\u0E19\u0E31\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19: \u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E23\u0E49\u0E32\u0E19 & \u0E1A\u0E17\u0E40\u0E23\u0E35\u0E22\u0E19\u0E18\u0E38\u0E23\u0E01\u0E34\u0E08", mode === "teacher" && "\u0E42\u0E2B\u0E21\u0E14\u0E04\u0E38\u0E13\u0E04\u0E23\u0E39: Telemetry & \u0E2A\u0E16\u0E34\u0E15\u0E34\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700/80 shadow-inner" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setMode("buyer"),
      className: `px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${mode === "buyer" ? "bg-brand-500 text-white shadow-md font-bold" : "text-slate-300 hover:text-white hover:bg-slate-700/50"}`
    },
    /* @__PURE__ */ React.createElement("span", null, "\u{1F9D1}\u200D\u{1F393}"),
    /* @__PURE__ */ React.createElement("span", null, "\u0E19\u0E31\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19 (\u0E1C\u0E39\u0E49\u0E0B\u0E37\u0E49\u0E2D)")
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setMode("seller"),
      className: `px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${mode === "seller" ? "bg-brand-lime text-slate-950 shadow-md font-bold" : "text-slate-300 hover:text-white hover:bg-slate-700/50"}`
    },
    /* @__PURE__ */ React.createElement("span", null, "\u{1F3EA}"),
    /* @__PURE__ */ React.createElement("span", null, "\u0E19\u0E31\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19 (\u0E1C\u0E39\u0E49\u0E02\u0E32\u0E22)")
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setMode("teacher"),
      className: `px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${mode === "teacher" ? "bg-cyan-500 text-slate-950 shadow-md font-bold" : "text-slate-300 hover:text-white hover:bg-slate-700/50"}`
    },
    /* @__PURE__ */ React.createElement("span", null, "\u{1F468}\u200D\u{1F3EB}"),
    /* @__PURE__ */ React.createElement("span", null, "\u0E04\u0E38\u0E13\u0E04\u0E23\u0E39 (Telemetry)")
  )), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: triggerManualSync,
      title: "\u0E0B\u0E34\u0E07\u0E04\u0E4C\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34\u0E01\u0E31\u0E1A Supabase Cloud (\u0E04\u0E25\u0E34\u0E01\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E1A\u0E31\u0E07\u0E04\u0E31\u0E1A\u0E0B\u0E34\u0E07\u0E04\u0E4C\u0E17\u0E31\u0E19\u0E17\u0E35)",
      className: `text-xs px-2.5 py-1.5 rounded-lg border transition-all flex items-center gap-2 ${syncStatus?.status === "syncing" ? "bg-amber-500/10 border-amber-500/40 text-amber-300" : syncStatus?.status === "error" ? "bg-red-500/10 border-red-500/40 text-red-300" : "bg-emerald-500/10 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20 shadow-sm"}`
    },
    /* @__PURE__ */ React.createElement("span", { className: "relative flex h-2 w-2" }, syncStatus?.status === "syncing" ? /* @__PURE__ */ React.createElement("span", { className: "animate-spin inline-block w-2 h-2 border-2 border-amber-400 border-t-transparent rounded-full" }) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { className: `animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${syncStatus?.status === "error" ? "bg-red-400" : "bg-emerald-400"}` }), /* @__PURE__ */ React.createElement("span", { className: `relative inline-flex rounded-full h-2 w-2 ${syncStatus?.status === "error" ? "bg-red-500" : "bg-emerald-400"}` }))),
    /* @__PURE__ */ React.createElement("span", { className: "font-semibold text-[11px] flex items-center gap-1" }, /* @__PURE__ */ React.createElement("span", null, syncStatus?.isCloud ? "Supabase Sync" : "Local DB"), syncStatus?.status === "syncing" && /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-amber-300 font-normal" }, "...")),
    syncStatus?.lastSync && /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-400 hidden sm:inline" }, syncStatus.lastSync)
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowConfirmReset(true),
      title: "\u0E23\u0E35\u0E40\u0E0B\u0E47\u0E15\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14\u0E01\u0E25\u0E31\u0E1A\u0E2A\u0E39\u0E48\u0E04\u0E48\u0E32\u0E40\u0E23\u0E34\u0E48\u0E21\u0E15\u0E49\u0E19",
      className: "text-xs text-slate-400 hover:text-red-300 hover:bg-red-500/10 px-2.5 py-1.5 rounded-lg border border-slate-700 hover:border-red-500/40 transition-colors flex items-center gap-1.5"
    },
    /* @__PURE__ */ React.createElement("span", null, "\u{1F504}"),
    /* @__PURE__ */ React.createElement("span", { className: "hidden sm:inline" }, "Reset")
  )))), showConfirmReset && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-pop-in" }, /* @__PURE__ */ React.createElement("div", { className: "w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xl mb-4" }, "\u26A0\uFE0F"), /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-bold text-slate-900" }, "\u0E23\u0E35\u0E40\u0E0B\u0E47\u0E15\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E14\u0E2A\u0E2D\u0E1A\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14?"), /* @__PURE__ */ React.createElement("p", { className: "text-sm text-slate-600 mt-1 mb-6" }, "\u0E23\u0E30\u0E1A\u0E1A\u0E08\u0E30\u0E23\u0E35\u0E40\u0E0B\u0E47\u0E15\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32 \u0E2D\u0E2D\u0E40\u0E14\u0E2D\u0E23\u0E4C \u0E1A\u0E17\u0E40\u0E23\u0E35\u0E22\u0E19\u0E17\u0E35\u0E48\u0E40\u0E23\u0E35\u0E22\u0E19\u0E08\u0E1A \u0E41\u0E25\u0E30\u0E2A\u0E16\u0E34\u0E15\u0E34 Telemetry \u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14\u0E01\u0E25\u0E31\u0E1A\u0E2A\u0E39\u0E48\u0E04\u0E48\u0E32\u0E40\u0E23\u0E34\u0E48\u0E21\u0E15\u0E49\u0E19"), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2.5 justify-end" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowConfirmReset(false),
      className: "px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
    },
    "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        resetDemoData();
        setShowConfirmReset(false);
      },
      className: "px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-md transition-colors"
    },
    "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E01\u0E32\u0E23\u0E23\u0E35\u0E40\u0E0B\u0E47\u0E15"
  )))));
}
function StudentBuyerView() {
  const { products, addToCart, cart, orders } = useEdu();
  const [selectedCategory, setSelectedCategory] = useState("\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCartModal, setShowCartModal] = useState(false);
  const [showMyOrdersModal, setShowMyOrdersModal] = useState(false);
  const [newlyCreatedOrder, setNewlyCreatedOrder] = useState(null);
  const categories = ["\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14", "\u0E2D\u0E32\u0E2B\u0E32\u0E23 & \u0E40\u0E1A\u0E40\u0E01\u0E2D\u0E23\u0E35\u0E48", "\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E14\u0E37\u0E48\u0E21", "\u0E07\u0E32\u0E19\u0E04\u0E23\u0E32\u0E1F\u0E15\u0E4C & DIY", "\u0E41\u0E1F\u0E0A\u0E31\u0E48\u0E19 & \u0E02\u0E2D\u0E07\u0E2A\u0E30\u0E2A\u0E21"];
  const filteredProducts = products.filter((p) => {
    const matchCat = selectedCategory === "\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14" || p.category === selectedCategory;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.storeName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });
  const cartItemCount = cart.reduce((sum, item) => sum + item.qty, 0);
  return /* @__PURE__ */ React.createElement("div", { className: "max-w-6xl mx-auto px-4 py-6 w-full animate-fade-in" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden mb-8 border border-slate-700/60" }, /* @__PURE__ */ React.createElement("div", { className: "relative z-10 max-w-xl" }, /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-3" }, /* @__PURE__ */ React.createElement("span", null, "\u2728"), /* @__PURE__ */ React.createElement("span", null, "\u0E15\u0E25\u0E32\u0E14\u0E19\u0E31\u0E14\u0E08\u0E33\u0E25\u0E2D\u0E07\u0E43\u0E19\u0E42\u0E23\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19 \xB7 \u0E40\u0E17\u0E2D\u0E21 2/2569")), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 leading-tight" }, "\u0E2D\u0E38\u0E14\u0E2B\u0E19\u0E38\u0E19\u0E44\u0E2D\u0E40\u0E14\u0E35\u0E22\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E2A\u0E23\u0E23\u0E04\u0E4C ", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { className: "text-brand-lime" }, "\u0E08\u0E32\u0E01\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E19 \u0E46 \u0E43\u0E19\u0E42\u0E23\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19")), /* @__PURE__ */ React.createElement("p", { className: "text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed" }, "\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32 \u0E02\u0E19\u0E21 \u0E07\u0E32\u0E19\u0E41\u0E2E\u0E19\u0E14\u0E4C\u0E40\u0E21\u0E14 \u0E41\u0E25\u0E30\u0E0A\u0E35\u0E17\u0E2A\u0E23\u0E38\u0E1B \u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E19\u0E31\u0E14\u0E23\u0E31\u0E1A\u0E02\u0E2D\u0E07\u0E17\u0E35\u0E48\u0E42\u0E23\u0E07\u0E2D\u0E32\u0E2B\u0E32\u0E23\u0E2B\u0E23\u0E37\u0E2D\u0E43\u0E15\u0E49\u0E15\u0E36\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E1E\u0E31\u0E01\u0E01\u0E25\u0E32\u0E07\u0E27\u0E31\u0E19"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-wrap gap-2.5" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowMyOrdersModal(true),
      className: "bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border border-slate-600 transition-colors shadow-sm"
    },
    /* @__PURE__ */ React.createElement("span", null, "\u{1F39F}\uFE0F"),
    /* @__PURE__ */ React.createElement("span", null, "\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E0B\u0E37\u0E49\u0E2D\u0E41\u0E25\u0E30\u0E23\u0E2B\u0E31\u0E2A\u0E23\u0E31\u0E1A\u0E02\u0E2D\u0E07 (", orders.length, ")")
  ))), /* @__PURE__ */ React.createElement("div", { className: "hidden md:block absolute right-8 -bottom-4 w-52 opacity-95 pointer-events-none" }, /* @__PURE__ */ React.createElement("img", { src: "/assets/student-mascot.webp", alt: "Mascot", className: "w-full h-auto drop-shadow-2xl" }))), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-4 mb-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar" }, categories.map((cat) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: cat,
      onClick: () => setSelectedCategory(cat),
      className: `px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${selectedCategory === cat ? "bg-slate-900 text-white shadow-md" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"}`
    },
    cat
  ))), /* @__PURE__ */ React.createElement("div", { className: "relative w-full sm:w-64" }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: searchQuery,
      onChange: (e) => setSearchQuery(e.target.value),
      placeholder: "\u0E04\u0E49\u0E19\u0E2B\u0E32\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32\u0E2B\u0E23\u0E37\u0E2D\u0E23\u0E49\u0E32\u0E19\u0E04\u0E49\u0E32...",
      className: "w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/40 text-slate-800"
    }
  ), /* @__PURE__ */ React.createElement("span", { className: "absolute left-3 top-2.5 text-slate-400 text-xs" }, "\u{1F50D}"))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5" }, filteredProducts.map((product) => /* @__PURE__ */ React.createElement(
    "div",
    {
      key: product.id,
      className: "bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
    },
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "w-full h-36 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center text-5xl relative mb-3 overflow-hidden border border-slate-100" }, /* @__PURE__ */ React.createElement("span", { className: "transform group-hover:scale-110 transition-transform duration-200" }, product.emoji || "\u{1F4E6}"), /* @__PURE__ */ React.createElement("div", { className: "absolute top-2 left-2 flex flex-col gap-1" }, product.isVerified && /* @__PURE__ */ React.createElement("span", { className: "bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1" }, /* @__PURE__ */ React.createElement("span", null, "\u2713"), /* @__PURE__ */ React.createElement("span", null, "Verified")), product.isPreorder && /* @__PURE__ */ React.createElement("span", { className: "bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm" }, "\u0E1E\u0E23\u0E35\u0E2D\u0E2D\u0E40\u0E14\u0E2D\u0E23\u0E4C")), /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-2 right-2" }, product.stock === 0 ? /* @__PURE__ */ React.createElement("span", { className: "bg-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full" }, "\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32\u0E2B\u0E21\u0E14") : product.stock <= 3 ? /* @__PURE__ */ React.createElement("span", { className: "bg-amber-100 text-amber-800 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-amber-300" }, "\u0E40\u0E2B\u0E25\u0E37\u0E2D ", product.stock, " \u0E0A\u0E34\u0E49\u0E19") : /* @__PURE__ */ React.createElement("span", { className: "bg-slate-900/70 text-white text-[10px] font-medium px-2 py-0.5 rounded-full backdrop-blur-xs" }, "\u0E2A\u0E15\u0E47\u0E2D\u0E01 ", product.stock))), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-slate-500 font-medium mb-1" }, product.storeName), /* @__PURE__ */ React.createElement("h3", { className: "font-bold text-slate-900 text-sm mb-1.5 line-clamp-1 group-hover:text-brand-600 transition-colors" }, product.title), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-600 line-clamp-2 mb-3" }, product.description)),
    /* @__PURE__ */ React.createElement("div", { className: "pt-3 border-t border-slate-100 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-base font-extrabold text-slate-900" }, "\u0E3F", product.price), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-400 block" }, "\u0E08\u0E38\u0E14\u0E23\u0E31\u0E1A: \u0E1E\u0E31\u0E01\u0E40\u0E17\u0E35\u0E48\u0E22\u0E07")), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => addToCart(product),
        disabled: product.stock === 0 && !product.isPreorder,
        className: `px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${product.stock === 0 && !product.isPreorder ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-slate-900 hover:bg-brand-500 text-white hover:text-white"}`
      },
      /* @__PURE__ */ React.createElement("span", null, "+"),
      /* @__PURE__ */ React.createElement("span", null, "\u0E40\u0E1E\u0E34\u0E48\u0E21")
    ))
  ))), cartItemCount > 0 && /* @__PURE__ */ React.createElement("div", { className: "fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-pop-in" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowCartModal(true),
      className: "bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl border border-slate-700 flex items-center gap-3 transition-transform hover:scale-105"
    },
    /* @__PURE__ */ React.createElement("span", { className: "text-base" }, "\u{1F6D2}"),
    /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold" }, "\u0E15\u0E30\u0E01\u0E23\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13 (", cartItemCount, " \u0E0A\u0E34\u0E49\u0E19)"),
    /* @__PURE__ */ React.createElement("span", { className: "w-1.5 h-1.5 rounded-full bg-brand-lime" }),
    /* @__PURE__ */ React.createElement("span", { className: "text-xs font-extrabold text-brand-lime" }, "\u0E3F", cart.reduce((s, i) => s + i.product.price * i.qty, 0))
  )), showCartModal && /* @__PURE__ */ React.createElement(
    CartCheckoutModal,
    {
      onClose: () => setShowCartModal(false),
      onOrderSuccess: (order) => {
        setShowCartModal(false);
        setNewlyCreatedOrder(order);
        setShowMyOrdersModal(true);
      }
    }
  ), showMyOrdersModal && /* @__PURE__ */ React.createElement(
    MyOrdersModal,
    {
      highlightOrder: newlyCreatedOrder,
      onClose: () => {
        setShowMyOrdersModal(false);
        setNewlyCreatedOrder(null);
      }
    }
  ));
}
function CartCheckoutModal({ onClose, onOrderSuccess }) {
  const { cart, updateCartQty, clearCart, placeOrder } = useEdu();
  const [isPreorder, setIsPreorder] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("\u0E42\u0E23\u0E07\u0E2D\u0E32\u0E2B\u0E32\u0E23\u0E01\u0E25\u0E32\u0E07 (\u0E40\u0E2A\u0E32\u0E15\u0E49\u0E19\u0E17\u0E35\u0E48 4)");
  const [pickupWindow, setPickupWindow] = useState("\u0E1E\u0E31\u0E01\u0E01\u0E25\u0E32\u0E07\u0E27\u0E31\u0E19 12:15 - 12:45");
  const total = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const locations = [
    { name: "\u0E42\u0E23\u0E07\u0E2D\u0E32\u0E2B\u0E32\u0E23\u0E01\u0E25\u0E32\u0E07 (\u0E40\u0E2A\u0E32\u0E15\u0E49\u0E19\u0E17\u0E35\u0E48 4)", icon: "\u{1F3EB}", desc: "\u0E42\u0E15\u0E4A\u0E30\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E01\u0E25\u0E38\u0E48\u0E21 \u0E21.4" },
    { name: "\u0E2D\u0E32\u0E04\u0E32\u0E23 3 \u0E0A\u0E31\u0E49\u0E19 1 (\u0E43\u0E15\u0E49\u0E15\u0E36\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19)", icon: "\u{1F3E2}", desc: "\u0E21\u0E49\u0E32\u0E19\u0E31\u0E48\u0E07\u0E2B\u0E19\u0E49\u0E32\u0E2A\u0E2B\u0E01\u0E23\u0E13\u0E4C" },
    { name: "\u0E23\u0E49\u0E32\u0E19\u0E2A\u0E2B\u0E01\u0E23\u0E13\u0E4C\u0E42\u0E23\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19", icon: "\u{1F3EA}", desc: "\u0E08\u0E38\u0E14\u0E27\u0E32\u0E07\u0E02\u0E2D\u0E07\u0E1D\u0E32\u0E01\u0E2A\u0E48\u0E07" },
    { name: "\u0E28\u0E32\u0E25\u0E32\u0E2B\u0E19\u0E49\u0E32\u0E40\u0E2A\u0E32\u0E18\u0E07", icon: "\u{1F6A9}", desc: "\u0E19\u0E31\u0E14\u0E23\u0E31\u0E1A\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E25\u0E34\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19" }
  ];
  const handleConfirm = () => {
    const order = placeOrder({
      isPreorder,
      pickupLocation,
      pickupWindow
    });
    if (order) {
      onOrderSuccess(order);
    }
  };
  return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-pop-in max-h-[90vh] overflow-y-auto" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-xl" }, "\u{1F6D2}"), /* @__PURE__ */ React.createElement("h2", { className: "text-lg font-bold text-slate-900" }, "\u0E15\u0E30\u0E01\u0E23\u0E49\u0E32\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32 & \u0E19\u0E31\u0E14\u0E23\u0E31\u0E1A\u0E02\u0E2D\u0E07")), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onClose,
      className: "w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm"
    },
    "\u2715"
  )), /* @__PURE__ */ React.createElement("div", { className: "divide-y divide-slate-100 mb-6" }, cart.map((item) => /* @__PURE__ */ React.createElement("div", { key: item.product.id, className: "py-3 flex items-center justify-between gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center" }, item.product.emoji), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { className: "text-xs font-bold text-slate-900" }, item.product.title), /* @__PURE__ */ React.createElement("span", { className: "text-[11px] text-slate-500" }, "\u0E3F", item.product.price, " / \u0E0A\u0E34\u0E49\u0E19"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 bg-slate-100 p-1 rounded-xl" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => updateCartQty(item.product.id, -1),
      className: "w-6 h-6 rounded-lg bg-white shadow-xs text-xs font-bold text-slate-700 flex items-center justify-center"
    },
    "-"
  ), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-slate-900 px-1" }, item.qty), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => updateCartQty(item.product.id, 1),
      className: "w-6 h-6 rounded-lg bg-white shadow-xs text-xs font-bold text-slate-700 flex items-center justify-center"
    },
    "+"
  ))))), /* @__PURE__ */ React.createElement("div", { className: "mb-5" }, /* @__PURE__ */ React.createElement("label", { className: "text-xs font-bold text-slate-800 block mb-2" }, "\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E01\u0E32\u0E23\u0E2A\u0E31\u0E48\u0E07\u0E0B\u0E37\u0E49\u0E2D"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setIsPreorder(false),
      className: `py-2 rounded-lg text-xs font-bold transition-all ${!isPreorder ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`
    },
    "\u26A1 \u0E0B\u0E37\u0E49\u0E2D\u0E17\u0E31\u0E19\u0E17\u0E35 (\u0E02\u0E2D\u0E07\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E2A\u0E48\u0E07)"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setIsPreorder(true),
      className: `py-2 rounded-lg text-xs font-bold transition-all ${isPreorder ? "bg-white text-amber-700 shadow-sm" : "text-slate-600 hover:text-slate-900"}`
    },
    "\u{1F4C5} \u0E1E\u0E23\u0E35\u0E2D\u0E2D\u0E40\u0E14\u0E2D\u0E23\u0E4C (\u0E2A\u0E31\u0E48\u0E07\u0E25\u0E48\u0E27\u0E07\u0E2B\u0E19\u0E49\u0E32)"
  ))), /* @__PURE__ */ React.createElement("div", { className: "mb-5" }, /* @__PURE__ */ React.createElement("label", { className: "text-xs font-bold text-slate-800 block mb-2" }, "\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E08\u0E38\u0E14\u0E19\u0E31\u0E14\u0E23\u0E31\u0E1A\u0E02\u0E2D\u0E07\u0E43\u0E19\u0E42\u0E23\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19"), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2" }, locations.map((loc) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: loc.name,
      type: "button",
      onClick: () => setPickupLocation(loc.name),
      className: `p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${pickupLocation === loc.name ? "border-brand-500 bg-brand-50/70 text-slate-900 ring-2 ring-brand-500/30" : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"}`
    },
    /* @__PURE__ */ React.createElement("span", { className: "text-lg" }, loc.icon),
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-xs font-bold" }, loc.name), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-slate-500" }, loc.desc))
  )))), /* @__PURE__ */ React.createElement("div", { className: "mb-6" }, /* @__PURE__ */ React.createElement("label", { className: "text-xs font-bold text-slate-800 block mb-2" }, "\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E19\u0E31\u0E14\u0E23\u0E31\u0E1A\u0E02\u0E2D\u0E07"), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: pickupWindow,
      onChange: (e) => setPickupWindow(e.target.value),
      className: "w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
    },
    /* @__PURE__ */ React.createElement("option", { value: "\u0E1E\u0E31\u0E01\u0E01\u0E25\u0E32\u0E07\u0E27\u0E31\u0E19 12:15 - 12:45" }, "\u0E1E\u0E31\u0E01\u0E01\u0E25\u0E32\u0E07\u0E27\u0E31\u0E19 (12:15 - 12:45 \u0E19.)"),
    /* @__PURE__ */ React.createElement("option", { value: "\u0E0A\u0E48\u0E27\u0E07\u0E1E\u0E31\u0E01\u0E1A\u0E48\u0E32\u0E22 14:30 - 14:45" }, "\u0E0A\u0E48\u0E27\u0E07\u0E1E\u0E31\u0E01\u0E1A\u0E48\u0E32\u0E22 (14:30 - 14:45 \u0E19.)"),
    /* @__PURE__ */ React.createElement("option", { value: "\u0E2B\u0E25\u0E31\u0E07\u0E40\u0E25\u0E34\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19 16:00 - 16:30" }, "\u0E2B\u0E25\u0E31\u0E07\u0E40\u0E25\u0E34\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19 (16:00 - 16:30 \u0E19.)")
  )), /* @__PURE__ */ React.createElement("div", { className: "pt-4 border-t border-slate-100 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-500 block" }, "\u0E22\u0E2D\u0E14\u0E23\u0E27\u0E21\u0E17\u0E31\u0E49\u0E07\u0E2A\u0E34\u0E49\u0E19"), /* @__PURE__ */ React.createElement("span", { className: "text-xl font-extrabold text-slate-900" }, "\u0E3F", total)), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: handleConfirm,
      className: "bg-brand-500 hover:bg-brand-600 text-white font-bold px-6 py-2.5 rounded-xl shadow-md transition-colors text-xs flex items-center gap-2"
    },
    /* @__PURE__ */ React.createElement("span", null, "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E0B\u0E37\u0E49\u0E2D"),
    /* @__PURE__ */ React.createElement("span", null, "\u2794")
  ))));
}
function MyOrdersModal({ highlightOrder, onClose }) {
  const { orders } = useEdu();
  const [selectedOrder, setSelectedOrder] = useState(highlightOrder || orders[0] || null);
  const statusMap = {
    pending: { label: "\u0E23\u0E2D\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E0B\u0E37\u0E49\u0E2D", bg: "bg-amber-100 text-amber-800 border-amber-300" },
    preparing: { label: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32", bg: "bg-blue-100 text-blue-800 border-blue-300" },
    ready: { label: "\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E23\u0E31\u0E1A\u0E02\u0E2D\u0E07\u0E41\u0E25\u0E49\u0E27!", bg: "bg-emerald-100 text-emerald-800 border-emerald-300" },
    completed: { label: "\u0E23\u0E31\u0E1A\u0E02\u0E2D\u0E07\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08\u0E41\u0E25\u0E49\u0E27", bg: "bg-slate-100 text-slate-700 border-slate-200" }
  };
  return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 animate-pop-in max-h-[90vh] overflow-y-auto" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100 mb-5" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-xl" }, "\u{1F39F}\uFE0F"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-base font-bold text-slate-900" }, "\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E0B\u0E37\u0E49\u0E2D\u0E41\u0E25\u0E30\u0E23\u0E2B\u0E31\u0E2A\u0E23\u0E31\u0E1A\u0E02\u0E2D\u0E07 (Pickup Code)"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500" }, "\u0E41\u0E2A\u0E14\u0E07\u0E23\u0E2B\u0E31\u0E2A 4 \u0E2B\u0E25\u0E31\u0E01\u0E2B\u0E23\u0E37\u0E2D QR Code \u0E43\u0E2B\u0E49\u0E23\u0E49\u0E32\u0E19\u0E04\u0E49\u0E32\u0E2A\u0E41\u0E01\u0E19\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E23\u0E31\u0E1A\u0E02\u0E2D\u0E07"))), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onClose,
      className: "w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm"
    },
    "\u2715"
  )), orders.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "py-12 text-center text-slate-400" }, /* @__PURE__ */ React.createElement("span", { className: "text-4xl block mb-2" }, "\u{1F4E6}"), /* @__PURE__ */ React.createElement("p", { className: "text-sm" }, "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E0B\u0E37\u0E49\u0E2D")) : /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-2.5 max-h-[380px] overflow-y-auto pr-1" }, orders.map((order) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: order.id,
      onClick: () => setSelectedOrder(order),
      className: `w-full text-left p-3.5 rounded-2xl border transition-all ${selectedOrder?.id === order.id ? "border-brand-500 bg-brand-50/50 shadow-sm" : "border-slate-200 hover:border-slate-300 bg-white"}`
    },
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-slate-900" }, order.storeName), /* @__PURE__ */ React.createElement("span", { className: `text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusMap[order.status]?.bg}` }, statusMap[order.status]?.label)),
    /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-slate-500 mb-1.5" }, order.items.map((i) => `${i.title} x${i.qty}`).join(", ")),
    /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between text-[11px] text-slate-400" }, /* @__PURE__ */ React.createElement("span", null, "\u0E23\u0E2B\u0E31\u0E2A: ", /* @__PURE__ */ React.createElement("b", { className: "text-slate-800 font-mono" }, "#", order.code)), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-900" }, "\u0E3F", order.total))
  ))), selectedOrder && /* @__PURE__ */ React.createElement("div", { className: "bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col items-center justify-center text-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-500 font-medium" }, "\u0E23\u0E2B\u0E31\u0E2A\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A\u0E02\u0E2D\u0E07 (Pickup Code)"), /* @__PURE__ */ React.createElement("div", { className: "text-3xl font-black font-mono tracking-widest text-slate-900 bg-white px-5 py-1.5 rounded-xl border border-slate-200 shadow-sm mt-1 mb-4 text-emerald-600" }, "#", selectedOrder.code), /* @__PURE__ */ React.createElement("div", { className: "mb-4" }, /* @__PURE__ */ React.createElement(QRCodeSVG, { value: `EDUMARKET:${selectedOrder.id}:${selectedOrder.code}`, size: 140 })), /* @__PURE__ */ React.createElement("div", { className: "w-full bg-white p-3 rounded-xl border border-slate-200 text-left text-xs space-y-1 mb-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-slate-500" }, "\u0E23\u0E49\u0E32\u0E19\u0E04\u0E49\u0E32:"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-900" }, selectedOrder.storeName)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-slate-500" }, "\u0E08\u0E38\u0E14\u0E23\u0E31\u0E1A\u0E02\u0E2D\u0E07:"), /* @__PURE__ */ React.createElement("span", { className: "font-semibold text-slate-900" }, selectedOrder.pickupLocation)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", { className: "text-slate-500" }, "\u0E40\u0E27\u0E25\u0E32\u0E19\u0E31\u0E14\u0E23\u0E31\u0E1A:"), /* @__PURE__ */ React.createElement("span", { className: "font-semibold text-slate-900" }, selectedOrder.pickupWindow))), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-slate-400" }, "\u0E22\u0E37\u0E48\u0E19\u0E23\u0E2B\u0E31\u0E2A\u0E19\u0E35\u0E49\u0E2B\u0E23\u0E37\u0E2D\u0E43\u0E2B\u0E49\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E23\u0E49\u0E32\u0E19\u0E2A\u0E41\u0E01\u0E19 QR \u0E15\u0E2D\u0E19\u0E23\u0E31\u0E1A\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32")))));
}
function StudentSellerView() {
  const {
    stores,
    products,
    orders,
    lessons,
    isStoreUnlocked,
    updateOrderStatus,
    verifyPickupCode
  } = useEdu();
  const currentStore = stores[0];
  const myProducts = products.filter((p) => p.storeId === currentStore.id);
  const myOrders = orders.filter((o) => o.storeId === currentStore.id);
  const [activeTab, setActiveTab] = useState("lessons");
  const [showCostLessonModal, setShowCostLessonModal] = useState(false);
  const [showPricingLessonModal, setShowPricingLessonModal] = useState(false);
  const [showCreateProductModal, setShowCreateProductModal] = useState(false);
  const [verifyingOrder, setVerifyingOrder] = useState(null);
  const [enteredCode, setEnteredCode] = useState("");
  const totalRevenue = myOrders.filter((o) => o.status === "completed").reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = myOrders.filter((o) => o.status !== "completed").length;
  return /* @__PURE__ */ React.createElement("div", { className: "max-w-6xl mx-auto px-4 py-6 w-full animate-fade-in" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-16 h-16 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center text-3xl shadow-inner" }, currentStore.emoji), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React.createElement("h1", { className: "text-xl font-extrabold text-slate-900" }, currentStore.name), currentStore.isVerified && /* @__PURE__ */ React.createElement("span", { className: "bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full" }, "\u2713 Verified Store")), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 mt-0.5" }, currentStore.tagline), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 mt-1.5 text-xs text-slate-600" }, /* @__PURE__ */ React.createElement("span", null, "\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07: ", /* @__PURE__ */ React.createElement("b", { className: "text-slate-800" }, currentStore.ownerName, " (\u0E21.4/1)")), /* @__PURE__ */ React.createElement("span", null, "\u2022"), /* @__PURE__ */ React.createElement("span", null, "\u2B50 ", currentStore.rating, " (", currentStore.reviewCount, " \u0E23\u0E35\u0E27\u0E34\u0E27)")))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto" }, /* @__PURE__ */ React.createElement("div", { className: "bg-slate-50 p-3 rounded-xl border border-slate-100 text-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-400 font-semibold block uppercase" }, "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08"), /* @__PURE__ */ React.createElement("span", { className: "text-base font-extrabold text-emerald-600" }, "\u0E3F", totalRevenue)), /* @__PURE__ */ React.createElement("div", { className: "bg-slate-50 p-3 rounded-xl border border-slate-100 text-center" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-400 font-semibold block uppercase" }, "\u0E2D\u0E2D\u0E40\u0E14\u0E2D\u0E23\u0E4C\u0E23\u0E2D\u0E08\u0E31\u0E14\u0E2A\u0E48\u0E07"), /* @__PURE__ */ React.createElement("span", { className: "text-base font-extrabold text-amber-600" }, pendingOrders)), /* @__PURE__ */ React.createElement("div", { className: "bg-slate-50 p-3 rounded-xl border border-slate-100 text-center col-span-2 sm:col-span-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-400 font-semibold block uppercase" }, "\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32\u0E43\u0E19\u0E2A\u0E15\u0E47\u0E2D\u0E01"), /* @__PURE__ */ React.createElement("span", { className: "text-base font-extrabold text-slate-800" }, myProducts.length, " \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23")))), /* @__PURE__ */ React.createElement("div", { className: "flex border-b border-slate-200 mb-6 gap-2" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setActiveTab("lessons"),
      className: `pb-3 px-4 text-xs font-bold transition-all relative ${activeTab === "lessons" ? "text-slate-900 border-b-2 border-brand-500" : "text-slate-500 hover:text-slate-800"}`
    },
    /* @__PURE__ */ React.createElement("span", null, "\u{1F3AF} \u0E1A\u0E17\u0E40\u0E23\u0E35\u0E22\u0E19\u0E18\u0E38\u0E23\u0E01\u0E34\u0E08 & \u0E1B\u0E25\u0E14\u0E25\u0E47\u0E2D\u0E01\u0E23\u0E49\u0E32\u0E19"),
    (!lessons.costLesson.completed || !lessons.pricingLesson.completed) && /* @__PURE__ */ React.createElement("span", { className: "ml-1.5 w-2 h-2 rounded-full bg-amber-500 inline-block animate-pulse" })
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setActiveTab("orders"),
      className: `pb-3 px-4 text-xs font-bold transition-all relative ${activeTab === "orders" ? "text-slate-900 border-b-2 border-brand-500" : "text-slate-500 hover:text-slate-800"}`
    },
    /* @__PURE__ */ React.createElement("span", null, "\u{1F4E6} \u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E0B\u0E37\u0E49\u0E2D\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32 (", myOrders.length, ")"),
    pendingOrders > 0 && /* @__PURE__ */ React.createElement("span", { className: "ml-1.5 px-1.5 py-0.2 rounded-full bg-brand-500 text-white text-[10px]" }, pendingOrders)
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setActiveTab("products"),
      className: `pb-3 px-4 text-xs font-bold transition-all relative ${activeTab === "products" ? "text-slate-900 border-b-2 border-brand-500" : "text-slate-500 hover:text-slate-800"}`
    },
    /* @__PURE__ */ React.createElement("span", null, "\u{1F6CD}\uFE0F \u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32 (", myProducts.length, ")")
  )), activeTab === "lessons" && /* @__PURE__ */ React.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ React.createElement("div", { className: `p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${isStoreUnlocked ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-amber-50 border-amber-200 text-amber-900"}` }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, isStoreUnlocked ? "\u{1F389}" : "\u{1F512}"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { className: "text-sm font-bold" }, isStoreUnlocked ? "\u0E1B\u0E25\u0E14\u0E25\u0E47\u0E2D\u0E01\u0E23\u0E49\u0E32\u0E19\u0E04\u0E49\u0E32\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08! \u0E04\u0E38\u0E13\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E40\u0E1B\u0E34\u0E14\u0E02\u0E32\u0E22\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32\u0E41\u0E25\u0E49\u0E27" : "\u0E23\u0E30\u0E1A\u0E1A Learn-to-Unlock: \u0E17\u0E33\u0E20\u0E32\u0E23\u0E01\u0E34\u0E08\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E1B\u0E25\u0E14\u0E25\u0E47\u0E2D\u0E01\u0E01\u0E32\u0E23\u0E25\u0E07\u0E02\u0E32\u0E22\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32"), /* @__PURE__ */ React.createElement("p", { className: "text-xs opacity-80 mt-0.5" }, isStoreUnlocked ? "\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E17\u0E35\u0E48\u0E04\u0E33\u0E19\u0E27\u0E13\u0E44\u0E14\u0E49\u0E08\u0E32\u0E01\u0E1A\u0E17\u0E40\u0E23\u0E35\u0E22\u0E19\u0E08\u0E30\u0E16\u0E39\u0E01\u0E0B\u0E34\u0E07\u0E01\u0E4C\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E1F\u0E2D\u0E23\u0E4C\u0E21\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32\u0E42\u0E14\u0E22\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34" : "\u0E19\u0E31\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19\u0E08\u0E1A\u0E1A\u0E17\u0E40\u0E23\u0E35\u0E22\u0E19\u0E17\u0E35\u0E48 1 \u0E41\u0E25\u0E30 2 \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E02\u0E49\u0E32\u0E43\u0E08\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E08\u0E23\u0E34\u0E07\u0E41\u0E25\u0E30\u0E44\u0E21\u0E48\u0E15\u0E31\u0E49\u0E07\u0E23\u0E32\u0E04\u0E32\u0E02\u0E32\u0E22\u0E02\u0E32\u0E14\u0E17\u0E38\u0E19"))), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        if (isStoreUnlocked) {
          setShowCreateProductModal(true);
        } else {
          setShowCostLessonModal(true);
        }
      },
      className: `px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shadow-sm transition-all ${isStoreUnlocked ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-amber-600 hover:bg-amber-700 text-white"}`
    },
    isStoreUnlocked ? "\u2795 \u0E2A\u0E23\u0E49\u0E32\u0E07\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32\u0E43\u0E2B\u0E21\u0E48 (Auto-Cost)" : "\u0E40\u0E23\u0E34\u0E48\u0E21\u0E17\u0E33\u0E1A\u0E17\u0E40\u0E23\u0E35\u0E22\u0E19\u0E17\u0E31\u0E19\u0E17\u0E35"
  )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-3" }, /* @__PURE__ */ React.createElement("span", { className: "w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl" }, "\u{1FA99}"), lessons.costLesson.completed ? /* @__PURE__ */ React.createElement("span", { className: "bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-300 flex items-center gap-1" }, /* @__PURE__ */ React.createElement("span", null, "\u2713"), /* @__PURE__ */ React.createElement("span", null, "\u0E1C\u0E48\u0E32\u0E19\u0E41\u0E25\u0E49\u0E27")) : /* @__PURE__ */ React.createElement("span", { className: "bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-full" }, "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E1C\u0E48\u0E32\u0E19")), /* @__PURE__ */ React.createElement("h3", { className: "text-base font-bold text-slate-900 mb-1" }, "\u0E1A\u0E17\u0E40\u0E23\u0E35\u0E22\u0E19\u0E17\u0E35\u0E48 1: \u0E04\u0E34\u0E14\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E41\u0E25\u0E30\u0E02\u0E2D\u0E07\u0E40\u0E2A\u0E35\u0E22 (Cost & Waste)"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-600 mb-4 leading-relaxed" }, "\u0E1D\u0E36\u0E01\u0E04\u0E33\u0E19\u0E27\u0E13\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E15\u0E48\u0E2D\u0E0A\u0E34\u0E49\u0E19\u0E08\u0E23\u0E34\u0E07 \u0E40\u0E21\u0E37\u0E48\u0E2D\u0E40\u0E01\u0E34\u0E14\u0E02\u0E2D\u0E07\u0E40\u0E2A\u0E35\u0E22\u0E08\u0E32\u0E01\u0E01\u0E32\u0E23\u0E1C\u0E25\u0E34\u0E15 (\u0E40\u0E0A\u0E48\u0E19 \u0E02\u0E19\u0E21\u0E1B\u0E31\u0E07\u0E1B\u0E34\u0E49\u0E07\u0E44\u0E2B\u0E21\u0E49, \u0E41\u0E01\u0E49\u0E27\u0E41\u0E15\u0E01) \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E44\u0E21\u0E48\u0E43\u0E2B\u0E49\u0E02\u0E32\u0E14\u0E17\u0E38\u0E19\u0E42\u0E14\u0E22\u0E44\u0E21\u0E48\u0E23\u0E39\u0E49\u0E15\u0E31\u0E27"), lessons.costLesson.completed && /* @__PURE__ */ React.createElement("div", { className: "bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-slate-600" }, /* @__PURE__ */ React.createElement("span", null, "\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E23\u0E27\u0E21\u0E17\u0E35\u0E48\u0E04\u0E33\u0E19\u0E27\u0E13:"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-800" }, "\u0E3F", lessons.costLesson.batchCost)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-slate-600" }, /* @__PURE__ */ React.createElement("span", null, "\u0E1C\u0E25\u0E34\u0E15\u0E44\u0E14\u0E49\u0E2A\u0E38\u0E17\u0E18\u0E34:"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-800" }, lessons.costLesson.producedUnits - lessons.costLesson.wastedUnits, " \u0E0A\u0E34\u0E49\u0E19")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-emerald-700 font-bold pt-1 border-t border-slate-200" }, /* @__PURE__ */ React.createElement("span", null, "\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E08\u0E23\u0E34\u0E07\u0E15\u0E48\u0E2D\u0E0A\u0E34\u0E49\u0E19:"), /* @__PURE__ */ React.createElement("span", null, "\u0E3F", lessons.costLesson.unitCost.toFixed(2))))), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowCostLessonModal(true),
      className: "w-full py-2.5 rounded-xl border border-slate-200 hover:border-brand-500 hover:bg-brand-50 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
    },
    /* @__PURE__ */ React.createElement("span", null, lessons.costLesson.completed ? "\u0E41\u0E01\u0E49\u0E44\u0E02\u0E01\u0E32\u0E23\u0E04\u0E33\u0E19\u0E27\u0E13 \u270F\uFE0F" : "\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E41\u0E1A\u0E1A\u0E08\u0E33\u0E25\u0E2D\u0E07\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19 \u2794")
  )), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-3" }, /* @__PURE__ */ React.createElement("span", { className: "w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl" }, "\u{1F4C8}"), lessons.pricingLesson.completed ? /* @__PURE__ */ React.createElement("span", { className: "bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-300 flex items-center gap-1" }, /* @__PURE__ */ React.createElement("span", null, "\u2713"), /* @__PURE__ */ React.createElement("span", null, "\u0E1C\u0E48\u0E32\u0E19\u0E41\u0E25\u0E49\u0E27")) : /* @__PURE__ */ React.createElement("span", { className: "bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-full" }, "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E1C\u0E48\u0E32\u0E19")), /* @__PURE__ */ React.createElement("h3", { className: "text-base font-bold text-slate-900 mb-1" }, "\u0E1A\u0E17\u0E40\u0E23\u0E35\u0E22\u0E19\u0E17\u0E35\u0E48 2: \u0E08\u0E38\u0E14\u0E04\u0E38\u0E49\u0E21\u0E17\u0E38\u0E19\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E15\u0E31\u0E49\u0E07\u0E23\u0E32\u0E04\u0E32 (Break-Even)"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-600 mb-4 leading-relaxed" }, "\u0E40\u0E23\u0E35\u0E22\u0E19\u0E23\u0E39\u0E49\u0E08\u0E38\u0E14\u0E15\u0E31\u0E14\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E41\u0E25\u0E30\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E23\u0E27\u0E21 \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E2B\u0E32\u0E27\u0E48\u0E32\u0E15\u0E49\u0E2D\u0E07\u0E02\u0E32\u0E22\u0E43\u0E2B\u0E49\u0E44\u0E14\u0E49\u0E01\u0E35\u0E48\u0E0A\u0E34\u0E49\u0E19\u0E08\u0E36\u0E07\u0E08\u0E30\u0E40\u0E23\u0E34\u0E48\u0E21\u0E21\u0E35\u0E01\u0E33\u0E44\u0E23\u0E40\u0E02\u0E49\u0E32\u0E01\u0E23\u0E30\u0E40\u0E1B\u0E4B\u0E32"), lessons.pricingLesson.completed && /* @__PURE__ */ React.createElement("div", { className: "bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-slate-600" }, /* @__PURE__ */ React.createElement("span", null, "\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E04\u0E07\u0E17\u0E35\u0E48 (Fixed Cost):"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-800" }, "\u0E3F", lessons.pricingLesson.fixedCost)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-slate-600" }, /* @__PURE__ */ React.createElement("span", null, "\u0E23\u0E32\u0E04\u0E32\u0E02\u0E32\u0E22\u0E17\u0E35\u0E48\u0E15\u0E31\u0E49\u0E07\u0E44\u0E27\u0E49:"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-800" }, "\u0E3F", lessons.pricingLesson.sellingPrice)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-purple-700 font-bold pt-1 border-t border-slate-200" }, /* @__PURE__ */ React.createElement("span", null, "\u0E08\u0E38\u0E14\u0E04\u0E38\u0E49\u0E21\u0E17\u0E38\u0E19 (Break-Even):"), /* @__PURE__ */ React.createElement("span", null, "\u0E15\u0E49\u0E2D\u0E07\u0E02\u0E32\u0E22\u0E44\u0E14\u0E49 ", lessons.pricingLesson.breakEvenUnits, " \u0E0A\u0E34\u0E49\u0E19")))), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowPricingLessonModal(true),
      className: "w-full py-2.5 rounded-xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
    },
    /* @__PURE__ */ React.createElement("span", null, lessons.pricingLesson.completed ? "\u0E41\u0E01\u0E49\u0E44\u0E02\u0E01\u0E32\u0E23\u0E15\u0E31\u0E49\u0E07\u0E23\u0E32\u0E04\u0E32 \u270F\uFE0F" : "\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E01\u0E23\u0E32\u0E1F\u0E08\u0E38\u0E14\u0E04\u0E38\u0E49\u0E21\u0E17\u0E38\u0E19 \u2794")
  )))), activeTab === "orders" && /* @__PURE__ */ React.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("h3", { className: "text-sm font-bold text-slate-900" }, "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E0B\u0E37\u0E49\u0E2D\u0E02\u0E2D\u0E07\u0E23\u0E49\u0E32\u0E19 (", myOrders.length, ")"), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-500" }, "\u0E1C\u0E39\u0E49\u0E0B\u0E37\u0E49\u0E2D\u0E08\u0E30\u0E19\u0E33\u0E23\u0E2B\u0E31\u0E2A 4 \u0E2B\u0E25\u0E31\u0E01\u0E2B\u0E23\u0E37\u0E2D QR Code \u0E21\u0E32\u0E41\u0E2A\u0E14\u0E07\u0E15\u0E2D\u0E19\u0E23\u0E31\u0E1A\u0E02\u0E2D\u0E07")), /* @__PURE__ */ React.createElement("div", { className: "divide-y divide-slate-100 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm" }, myOrders.map((order) => /* @__PURE__ */ React.createElement("div", { key: order.id, className: "p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-start gap-3.5" }, /* @__PURE__ */ React.createElement("span", { className: "w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-lg mt-0.5" }, "\u{1F6CD}\uFE0F"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-1" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-900 text-sm" }, "#", order.id), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-500" }, "\u0E42\u0E14\u0E22 ", order.buyerName), /* @__PURE__ */ React.createElement("span", { className: "font-mono text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200" }, "Code: #", order.code)), /* @__PURE__ */ React.createElement("div", { className: "text-xs text-slate-700 font-medium mb-1" }, order.items.map((i) => `${i.title} (${i.qty} \u0E0A\u0E34\u0E49\u0E19)`).join(", ")), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-slate-400 flex flex-wrap gap-2" }, /* @__PURE__ */ React.createElement("span", null, "\u{1F4CD} \u0E08\u0E38\u0E14\u0E23\u0E31\u0E1A: ", /* @__PURE__ */ React.createElement("b", null, order.pickupLocation)), /* @__PURE__ */ React.createElement("span", null, "\u23F0 \u0E40\u0E27\u0E25\u0E32: ", /* @__PURE__ */ React.createElement("b", null, order.pickupWindow))))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 w-full sm:w-auto justify-end" }, order.status === "pending" && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => updateOrderStatus(order.id, "preparing"),
      className: "px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-bold border border-blue-200 transition-colors"
    },
    "\u0E40\u0E23\u0E34\u0E48\u0E21\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21\u0E02\u0E2D\u0E07 \u{1F373}"
  ), order.status === "preparing" && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => updateOrderStatus(order.id, "ready"),
      className: "px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-xs font-bold border border-emerald-200 transition-colors"
    },
    "\u0E41\u0E08\u0E49\u0E07\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E23\u0E31\u0E1A\u0E02\u0E2D\u0E07 \u{1F4E6}"
  ), order.status === "ready" && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        setVerifyingOrder(order);
        setEnteredCode("");
      },
      className: "px-4 py-2 bg-slate-900 hover:bg-slate-800 text-brand-lime rounded-xl text-xs font-extrabold shadow-sm transition-colors flex items-center gap-1.5"
    },
    /* @__PURE__ */ React.createElement("span", null, "\u{1F511}"),
    /* @__PURE__ */ React.createElement("span", null, "\u0E2A\u0E41\u0E01\u0E19 / \u0E01\u0E23\u0E2D\u0E01\u0E23\u0E2B\u0E31\u0E2A\u0E23\u0E31\u0E1A\u0E02\u0E2D\u0E07")
  ), order.status === "completed" && /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200" }, "\u2713 \u0E2A\u0E48\u0E07\u0E21\u0E2D\u0E1A\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08")))))), activeTab === "products" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ React.createElement("h3", { className: "text-sm font-bold text-slate-900" }, "\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14\u0E43\u0E19\u0E23\u0E49\u0E32\u0E19 (", myProducts.length, ")"), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        if (isStoreUnlocked) {
          setShowCreateProductModal(true);
        } else {
          setShowCostLessonModal(true);
        }
      },
      className: `px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${isStoreUnlocked ? "bg-slate-900 hover:bg-slate-800 text-white" : "bg-slate-200 text-slate-500 hover:bg-slate-300"}`
    },
    /* @__PURE__ */ React.createElement("span", null, isStoreUnlocked ? "\u2795 \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32\u0E43\u0E2B\u0E21\u0E48" : "\u{1F512} \u0E1B\u0E25\u0E14\u0E25\u0E47\u0E2D\u0E01\u0E14\u0E49\u0E27\u0E22\u0E1A\u0E17\u0E40\u0E23\u0E35\u0E22\u0E19")
  )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" }, myProducts.map((p) => /* @__PURE__ */ React.createElement("div", { key: p.id, className: "bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement("span", { className: "w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl" }, p.emoji), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h4", { className: "text-xs font-bold text-slate-900" }, p.title), /* @__PURE__ */ React.createElement("span", { className: "text-[11px] text-slate-500" }, "\u0E23\u0E32\u0E04\u0E32 \u0E3F", p.price, " (\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19 \u0E3F", p.cost, ")"), /* @__PURE__ */ React.createElement("div", { className: "text-[10px] text-emerald-600 font-semibold" }, "\u0E01\u0E33\u0E44\u0E23 \u0E3F", p.price - p.cost, " / \u0E0A\u0E34\u0E49\u0E19"))), /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-slate-700 block" }, "\u0E04\u0E07\u0E40\u0E2B\u0E25\u0E37\u0E2D ", p.stock)))))), showCostLessonModal && /* @__PURE__ */ React.createElement(
    Lesson1CostModal,
    {
      initialData: lessons.costLesson,
      onClose: () => setShowCostLessonModal(false)
    }
  ), showPricingLessonModal && /* @__PURE__ */ React.createElement(
    Lesson2PricingModal,
    {
      initialData: lessons.pricingLesson,
      syncedCost: lessons.costLesson.unitCost,
      onClose: () => setShowPricingLessonModal(false)
    }
  ), showCreateProductModal && /* @__PURE__ */ React.createElement(
    CreateProductModal,
    {
      defaultCost: lessons.costLesson.unitCost,
      onClose: () => setShowCreateProductModal(false)
    }
  ), verifyingOrder && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-pop-in" }, /* @__PURE__ */ React.createElement("div", { className: "text-center mb-4" }, /* @__PURE__ */ React.createElement("span", { className: "text-3xl block mb-1" }, "\u{1F511}"), /* @__PURE__ */ React.createElement("h3", { className: "text-base font-bold text-slate-900" }, "\u0E15\u0E23\u0E27\u0E08\u0E23\u0E2B\u0E31\u0E2A\u0E23\u0E31\u0E1A\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500" }, "\u0E01\u0E23\u0E2D\u0E01\u0E23\u0E2B\u0E31\u0E2A 4 \u0E2B\u0E25\u0E31\u0E01\u0E17\u0E35\u0E48\u0E1B\u0E23\u0E32\u0E01\u0E0F\u0E1A\u0E19\u0E2B\u0E19\u0E49\u0E32\u0E08\u0E2D\u0E21\u0E37\u0E2D\u0E16\u0E37\u0E2D\u0E02\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E0B\u0E37\u0E49\u0E2D (", verifyingOrder.buyerName, ")")), /* @__PURE__ */ React.createElement("div", { className: "mb-4" }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      maxLength: 4,
      value: enteredCode,
      onChange: (e) => setEnteredCode(e.target.value),
      placeholder: "\u0E01\u0E23\u0E2D\u0E01\u0E23\u0E2B\u0E31\u0E2A 4 \u0E2B\u0E25\u0E31\u0E01 (\u0E40\u0E0A\u0E48\u0E19 7829)",
      className: "w-full text-center text-2xl font-black font-mono tracking-widest py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900",
      autoFocus: true
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: () => setVerifyingOrder(null),
      className: "w-1/2 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
    },
    "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: () => {
        const res = verifyPickupCode(verifyingOrder.id, enteredCode);
        if (res.success) {
          setVerifyingOrder(null);
        }
      },
      disabled: enteredCode.length !== 4,
      className: "w-1/2 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:bg-slate-200 text-white font-bold text-xs shadow-md transition-colors"
    },
    "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E01\u0E32\u0E23\u0E2A\u0E48\u0E07\u0E21\u0E2D\u0E1A"
  )))));
}
function Lesson1CostModal({ initialData, onClose }) {
  const { saveLesson1 } = useEdu();
  const [batchCost, setBatchCost] = useState(initialData.batchCost || 350);
  const [producedUnits, setProducedUnits] = useState(initialData.producedUnits || 20);
  const [wastedUnits, setWastedUnits] = useState(initialData.wastedUnits || 2);
  const usableUnits = Math.max(0, producedUnits - wastedUnits);
  const isAllWaste = usableUnits === 0;
  const trueCostPerUnit = isAllWaste ? 0 : batchCost / usableUnits;
  const baseCostPerUnit = producedUnits > 0 ? batchCost / producedUnits : 0;
  const wastePenalty = trueCostPerUnit - baseCostPerUnit;
  const wastePercentage = producedUnits > 0 ? wastedUnits / producedUnits * 100 : 0;
  const handleSave = () => {
    if (isAllWaste) return;
    saveLesson1({
      batchCost,
      producedUnits,
      wastedUnits,
      unitCost: Number(trueCostPerUnit.toFixed(2))
    });
    onClose();
  };
  return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-pop-in max-h-[92vh] overflow-y-auto" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100 mb-5" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2.5" }, /* @__PURE__ */ React.createElement("span", { className: "w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg" }, "\u{1FA99}"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "text-base font-bold text-slate-900" }, "\u0E41\u0E1A\u0E1A\u0E08\u0E33\u0E25\u0E2D\u0E07: \u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E08\u0E23\u0E34\u0E07\u0E2B\u0E25\u0E31\u0E07\u0E23\u0E27\u0E21\u0E02\u0E2D\u0E07\u0E40\u0E2A\u0E35\u0E22 (Cost & Waste)"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500" }, "\u0E1B\u0E23\u0E31\u0E1A\u0E15\u0E31\u0E27\u0E40\u0E25\u0E37\u0E48\u0E2D\u0E19\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E14\u0E39\u0E1C\u0E25\u0E01\u0E23\u0E30\u0E17\u0E1A\u0E02\u0E2D\u0E07\u0E02\u0E2D\u0E07\u0E40\u0E2A\u0E35\u0E22\u0E17\u0E35\u0E48\u0E21\u0E35\u0E15\u0E48\u0E2D\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E15\u0E48\u0E2D\u0E0A\u0E34\u0E49\u0E19"))), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onClose,
      className: "w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm"
    },
    "\u2715"
  )), /* @__PURE__ */ React.createElement("div", { className: "space-y-4 mb-6" }, /* @__PURE__ */ React.createElement("div", { className: "bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center mb-1 text-xs" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-700" }, "1. \u0E40\u0E07\u0E34\u0E19\u0E17\u0E38\u0E19\u0E23\u0E27\u0E21\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E1C\u0E25\u0E34\u0E15\u0E17\u0E31\u0E49\u0E07\u0E01\u0E49\u0E2D\u0E19 (Batch Cost)"), /* @__PURE__ */ React.createElement("span", { className: "font-extrabold text-emerald-600 text-sm" }, "\u0E3F", batchCost)), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "range",
      min: "100",
      max: "2000",
      step: "50",
      value: batchCost,
      onChange: (e) => setBatchCost(Number(e.target.value))
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-[10px] text-slate-400 mt-1" }, /* @__PURE__ */ React.createElement("span", null, "\u0E3F100"), /* @__PURE__ */ React.createElement("span", null, "\u0E3F1,000"), /* @__PURE__ */ React.createElement("span", null, "\u0E3F2,000"))), /* @__PURE__ */ React.createElement("div", { className: "bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center mb-1 text-xs" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-700" }, "2. \u0E08\u0E33\u0E19\u0E27\u0E19\u0E17\u0E35\u0E48\u0E17\u0E33\u0E2D\u0E2D\u0E01\u0E21\u0E32\u0E44\u0E14\u0E49\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 (Produced Units)"), /* @__PURE__ */ React.createElement("span", { className: "font-extrabold text-slate-900 text-sm" }, producedUnits, " \u0E0A\u0E34\u0E49\u0E19")), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "range",
      min: "5",
      max: "60",
      step: "1",
      value: producedUnits,
      onChange: (e) => setProducedUnits(Number(e.target.value))
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-[10px] text-slate-400 mt-1" }, /* @__PURE__ */ React.createElement("span", null, "5 \u0E0A\u0E34\u0E49\u0E19"), /* @__PURE__ */ React.createElement("span", null, "30 \u0E0A\u0E34\u0E49\u0E19"), /* @__PURE__ */ React.createElement("span", null, "60 \u0E0A\u0E34\u0E49\u0E19"))), /* @__PURE__ */ React.createElement("div", { className: "bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center mb-1 text-xs" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-700" }, "3. \u0E08\u0E33\u0E19\u0E27\u0E19\u0E02\u0E2D\u0E07\u0E40\u0E2A\u0E35\u0E22 / \u0E15\u0E01\u0E2B\u0E25\u0E48\u0E19 / \u0E44\u0E2B\u0E21\u0E49 (Wasted Units)"), /* @__PURE__ */ React.createElement("span", { className: "font-extrabold text-coral-500 text-sm" }, wastedUnits, " \u0E0A\u0E34\u0E49\u0E19 (", wastePercentage.toFixed(0), "%)")), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "range",
      className: "slider-coral",
      min: "0",
      max: producedUnits,
      step: "1",
      value: wastedUnits,
      onChange: (e) => setWastedUnits(Number(e.target.value))
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-[10px] text-slate-400 mt-1" }, /* @__PURE__ */ React.createElement("span", null, "0 \u0E0A\u0E34\u0E49\u0E19 (\u0E44\u0E21\u0E48\u0E21\u0E35\u0E02\u0E2D\u0E07\u0E40\u0E2A\u0E35\u0E22)"), /* @__PURE__ */ React.createElement("span", null, "\u0E40\u0E2A\u0E35\u0E22\u0E04\u0E23\u0E36\u0E48\u0E07\u0E2B\u0E19\u0E36\u0E48\u0E07"), /* @__PURE__ */ React.createElement("span", null, "\u0E40\u0E2A\u0E35\u0E22\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14")))), isAllWaste && /* @__PURE__ */ React.createElement("div", { className: "p-3.5 mb-5 rounded-2xl bg-coral-50 border border-coral-200 text-coral-800 text-xs flex items-center gap-2 animate-pop-in" }, /* @__PURE__ */ React.createElement("span", { className: "text-lg" }, "\u26A0\uFE0F"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "\u0E02\u0E2D\u0E07\u0E40\u0E2A\u0E35\u0E22 100%! \u0E44\u0E21\u0E48\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E1C\u0E25\u0E34\u0E15\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E02\u0E32\u0E22\u0E44\u0E14\u0E49"), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] opacity-90" }, "\u0E02\u0E2D\u0E07\u0E40\u0E2A\u0E35\u0E22\u0E40\u0E17\u0E48\u0E32\u0E01\u0E31\u0E1A\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E25\u0E34\u0E15 \u0E17\u0E33\u0E43\u0E2B\u0E49\u0E44\u0E21\u0E48\u0E21\u0E35\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32\u0E02\u0E32\u0E22\u0E41\u0E25\u0E30\u0E04\u0E33\u0E19\u0E27\u0E13\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49"))), !isAllWaste && /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-2xl mb-6 shadow-md border border-slate-700" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-emerald-400 font-bold uppercase tracking-wider" }, "\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E08\u0E23\u0E34\u0E07\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E43\u0E0A\u0E49\u0E15\u0E31\u0E49\u0E07\u0E23\u0E32\u0E04\u0E32 (True Unit Cost)"), /* @__PURE__ */ React.createElement("div", { className: "text-3xl font-extrabold text-white mt-0.5" }, "\u0E3F", trueCostPerUnit.toFixed(2), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-300 font-normal ml-2" }, "/ \u0E0A\u0E34\u0E49\u0E19"))), /* @__PURE__ */ React.createElement("div", { className: "text-left sm:text-right text-xs text-slate-300 space-y-0.5" }, /* @__PURE__ */ React.createElement("div", null, "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E17\u0E35\u0E48\u0E02\u0E32\u0E22\u0E44\u0E14\u0E49\u0E08\u0E23\u0E34\u0E07: ", /* @__PURE__ */ React.createElement("b", { className: "text-white" }, usableUnits, " \u0E0A\u0E34\u0E49\u0E19")), /* @__PURE__ */ React.createElement("div", null, "\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E2A\u0E48\u0E27\u0E19\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E08\u0E32\u0E01\u0E02\u0E2D\u0E07\u0E40\u0E2A\u0E35\u0E22: ", /* @__PURE__ */ React.createElement("b", { className: "text-coral-400" }, "+\u0E3F", wastePenalty.toFixed(2), " / \u0E0A\u0E34\u0E49\u0E19")))), /* @__PURE__ */ React.createElement("div", { className: "space-y-1.5 pt-3 border-t border-slate-700/80" }, /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-slate-300 flex justify-between" }, /* @__PURE__ */ React.createElement("span", null, "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E10\u0E32\u0E19 vs \u0E2A\u0E48\u0E27\u0E19\u0E02\u0E2D\u0E07\u0E40\u0E2A\u0E35\u0E22:"), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-300 font-semibold" }, baseCostPerUnit.toFixed(1), "\u0E3F + ", wastePenalty.toFixed(1), "\u0E3F")), /* @__PURE__ */ React.createElement("div", { className: "w-full h-3 rounded-full bg-slate-700 flex overflow-hidden" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { width: `${Math.max(10, 100 - wastePercentage)}%` },
      className: "bg-emerald-500 h-full transition-all duration-200",
      title: "\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E01\u0E32\u0E23\u0E1C\u0E25\u0E34\u0E15\u0E1B\u0E01\u0E15\u0E34"
    }
  ), /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { width: `${wastePercentage}%` },
      className: "bg-coral-500 h-full transition-all duration-200",
      title: "\u0E20\u0E32\u0E23\u0E30\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E08\u0E32\u0E01\u0E02\u0E2D\u0E07\u0E40\u0E2A\u0E35\u0E22"
    }
  )))), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 justify-end" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onClose,
      className: "px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
    },
    "\u0E1B\u0E34\u0E14"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: handleSave,
      disabled: isAllWaste,
      className: "px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-xs shadow-md transition-colors"
    },
    "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E1C\u0E25 & \u0E0B\u0E34\u0E07\u0E01\u0E4C\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E2A\u0E39\u0E48\u0E1F\u0E2D\u0E23\u0E4C\u0E21\u0E02\u0E32\u0E22 \u2794"
  ))));
}
function Lesson2PricingModal({ initialData, syncedCost = 19.44, onClose }) {
  const { saveLesson2 } = useEdu();
  const [fixedCost, setFixedCost] = useState(initialData.fixedCost || 120);
  const [unitCost, setUnitCost] = useState(syncedCost || 19.44);
  const [sellingPrice, setSellingPrice] = useState(initialData.sellingPrice || 35);
  const marginPerUnit = sellingPrice - unitCost;
  const isLossPrice = marginPerUnit <= 0;
  const breakEvenUnits = isLossPrice ? 0 : Math.ceil(fixedCost / marginPerUnit);
  const marginRatio = sellingPrice > 0 ? marginPerUnit / sellingPrice * 100 : 0;
  const handleSave = () => {
    if (isLossPrice) return;
    saveLesson2({
      fixedCost,
      unitCost,
      sellingPrice,
      breakEvenUnits
    });
    onClose();
  };
  return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-pop-in max-h-[92vh] overflow-y-auto" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100 mb-5" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2.5" }, /* @__PURE__ */ React.createElement("span", { className: "w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg" }, "\u{1F4C8}"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "text-base font-bold text-slate-900" }, "\u0E41\u0E1A\u0E1A\u0E08\u0E33\u0E25\u0E2D\u0E07: \u0E08\u0E38\u0E14\u0E04\u0E38\u0E49\u0E21\u0E17\u0E38\u0E19\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E15\u0E31\u0E49\u0E07\u0E23\u0E32\u0E04\u0E32 (Break-Even)"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500" }, "\u0E08\u0E33\u0E25\u0E2D\u0E07\u0E08\u0E38\u0E14\u0E15\u0E31\u0E14\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E41\u0E25\u0E30\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E23\u0E27\u0E21\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E1B\u0E25\u0E14\u0E25\u0E47\u0E2D\u0E01\u0E01\u0E32\u0E23\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32"))), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onClose,
      className: "w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm"
    },
    "\u2715"
  )), /* @__PURE__ */ React.createElement("div", { className: "space-y-4 mb-5" }, /* @__PURE__ */ React.createElement("div", { className: "bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center mb-1 text-xs" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-700" }, "1. \u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E04\u0E07\u0E17\u0E35\u0E48 (\u0E04\u0E48\u0E32\u0E40\u0E0A\u0E48\u0E32\u0E42\u0E15\u0E4A\u0E30 \u0E04\u0E48\u0E32\u0E2D\u0E38\u0E1B\u0E01\u0E23\u0E13\u0E4C \u0E1B\u0E49\u0E32\u0E22\u0E23\u0E49\u0E32\u0E19)"), /* @__PURE__ */ React.createElement("span", { className: "font-extrabold text-slate-900 text-sm" }, "\u0E3F", fixedCost)), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "range",
      min: "50",
      max: "500",
      step: "10",
      value: fixedCost,
      onChange: (e) => setFixedCost(Number(e.target.value))
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-[10px] text-slate-400 mt-1" }, /* @__PURE__ */ React.createElement("span", null, "\u0E3F50"), /* @__PURE__ */ React.createElement("span", null, "\u0E3F250"), /* @__PURE__ */ React.createElement("span", null, "\u0E3F500"))), /* @__PURE__ */ React.createElement("div", { className: "bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center mb-1 text-xs" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-700" }, "2. \u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E1C\u0E31\u0E19\u0E41\u0E1B\u0E23\u0E15\u0E48\u0E2D\u0E0A\u0E34\u0E49\u0E19 (Variable Cost)", /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-emerald-600 ml-1.5 font-semibold" }, "\u2728 \u0E0B\u0E34\u0E07\u0E01\u0E4C\u0E08\u0E32\u0E01\u0E1A\u0E17\u0E40\u0E23\u0E35\u0E22\u0E19 1")), /* @__PURE__ */ React.createElement("span", { className: "font-extrabold text-slate-900 text-sm" }, "\u0E3F", unitCost.toFixed(2))), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "range",
      min: "5",
      max: "60",
      step: "1",
      value: unitCost,
      onChange: (e) => setUnitCost(Number(e.target.value))
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center mb-1 text-xs" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-700" }, "3. \u0E23\u0E32\u0E04\u0E32\u0E02\u0E32\u0E22\u0E15\u0E48\u0E2D\u0E0A\u0E34\u0E49\u0E19\u0E17\u0E35\u0E48\u0E15\u0E31\u0E49\u0E07\u0E44\u0E27\u0E49 (Selling Price)"), /* @__PURE__ */ React.createElement("span", { className: "font-extrabold text-emerald-600 text-sm" }, "\u0E3F", sellingPrice)), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "range",
      min: "10",
      max: "100",
      step: "1",
      value: sellingPrice,
      onChange: (e) => setSellingPrice(Number(e.target.value))
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between text-[10px] text-slate-400 mt-1" }, /* @__PURE__ */ React.createElement("span", null, "\u0E3F10"), /* @__PURE__ */ React.createElement("span", null, "\u0E3F50"), /* @__PURE__ */ React.createElement("span", null, "\u0E3F100")))), isLossPrice && /* @__PURE__ */ React.createElement("div", { className: "p-3.5 mb-5 rounded-2xl bg-coral-50 border border-coral-200 text-coral-800 text-xs flex items-center gap-2 animate-pop-in" }, /* @__PURE__ */ React.createElement("span", { className: "text-lg" }, "\u26A0\uFE0F"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "\u0E23\u0E32\u0E04\u0E32\u0E02\u0E32\u0E22\u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E17\u0E48\u0E32\u0E01\u0E31\u0E1A\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19! (Margin \u0E15\u0E34\u0E14\u0E25\u0E1A)"), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] opacity-90" }, "\u0E02\u0E32\u0E22\u0E22\u0E34\u0E48\u0E07\u0E40\u0E22\u0E2D\u0E30\u0E22\u0E34\u0E48\u0E07\u0E02\u0E32\u0E14\u0E17\u0E38\u0E19 \u0E08\u0E30\u0E44\u0E21\u0E48\u0E21\u0E35\u0E27\u0E31\u0E19\u0E04\u0E38\u0E49\u0E21\u0E17\u0E38\u0E19\u0E44\u0E14\u0E49 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E1B\u0E23\u0E31\u0E1A\u0E23\u0E32\u0E04\u0E32\u0E02\u0E32\u0E22\u0E43\u0E2B\u0E49\u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32 \u0E3F", unitCost.toFixed(2)))), !isLossPrice && /* @__PURE__ */ React.createElement("div", { className: "bg-slate-900 text-white p-4 rounded-2xl mb-6 shadow-inner border border-slate-800" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center mb-3" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-slate-300" }, "\u0E01\u0E23\u0E32\u0E1F\u0E08\u0E38\u0E14\u0E04\u0E38\u0E49\u0E21\u0E17\u0E38\u0E19 (Revenue vs Total Cost)"), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-extrabold text-brand-lime bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30" }, "\u0E08\u0E38\u0E14\u0E04\u0E38\u0E49\u0E21\u0E17\u0E38\u0E19: ", breakEvenUnits, " \u0E0A\u0E34\u0E49\u0E19")), /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 340 160", className: "w-full h-36 bg-slate-950/60 rounded-xl p-2" }, /* @__PURE__ */ React.createElement("line", { x1: "30", y1: "130", x2: "320", y2: "130", stroke: "#475569", strokeWidth: "1.5" }), /* @__PURE__ */ React.createElement("line", { x1: "30", y1: "130", x2: "30", y2: "20", stroke: "#475569", strokeWidth: "1.5" }), /* @__PURE__ */ React.createElement("text", { x: "310", y: "145", fill: "#94a3b8", fontSize: "9" }, "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E0A\u0E34\u0E49\u0E19 (Q)"), /* @__PURE__ */ React.createElement("text", { x: "10", y: "16", fill: "#94a3b8", fontSize: "9" }, "\u0E1A\u0E32\u0E17 (\u0E3F)"), /* @__PURE__ */ React.createElement("line", { x1: "30", y1: "95", x2: "320", y2: "95", stroke: "#94a3b8", strokeDasharray: "3 3", strokeWidth: "1.2" }), /* @__PURE__ */ React.createElement("text", { x: "35", y: "90", fill: "#94a3b8", fontSize: "8" }, "Fixed Cost (", fixedCost, "\u0E3F)"), /* @__PURE__ */ React.createElement("line", { x1: "30", y1: "95", x2: "300", y2: "35", stroke: "#f97316", strokeWidth: "2.5" }), /* @__PURE__ */ React.createElement("line", { x1: "30", y1: "130", x2: "300", y2: "25", stroke: "#10b981", strokeWidth: "2.5" }), /* @__PURE__ */ React.createElement("circle", { cx: "160", cy: "65", r: "5", fill: "#c8ff00", stroke: "#0f172a", strokeWidth: "2" }), /* @__PURE__ */ React.createElement("text", { x: "168", y: "62", fill: "#c8ff00", fontSize: "10", fontWeight: "bold" }, "\u0E08\u0E38\u0E14\u0E04\u0E38\u0E49\u0E21\u0E17\u0E38\u0E19 (", breakEvenUnits, " \u0E0A\u0E34\u0E49\u0E19)")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between items-center text-[11px] text-slate-300 mt-2 px-1" }, /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" }), " \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21"), /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement("span", { className: "w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" }), " \u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E23\u0E27\u0E21"), /* @__PURE__ */ React.createElement("span", null, "\u0E01\u0E33\u0E44\u0E23\u0E2A\u0E48\u0E27\u0E19\u0E40\u0E01\u0E34\u0E19: ", /* @__PURE__ */ React.createElement("b", { className: "text-emerald-400" }, "\u0E3F", marginPerUnit.toFixed(1), " / \u0E0A\u0E34\u0E49\u0E19 (", marginRatio.toFixed(0), "%)")))), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 justify-end" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onClose,
      className: "px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
    },
    "\u0E1B\u0E34\u0E14"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: handleSave,
      disabled: isLossPrice,
      className: "px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white font-bold text-xs shadow-md transition-colors"
    },
    "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E1C\u0E25 & \u0E1B\u0E25\u0E14\u0E25\u0E47\u0E2D\u0E01\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32 \u{1F680}"
  ))));
}
function CreateProductModal({ defaultCost = 19.44, onClose }) {
  const { addProduct } = useEdu();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("\u0E2D\u0E32\u0E2B\u0E32\u0E23 & \u0E40\u0E1A\u0E40\u0E01\u0E2D\u0E23\u0E35\u0E48");
  const [cost, setCost] = useState(defaultCost || 18);
  const [price, setPrice] = useState(35);
  const [stock, setStock] = useState(20);
  const [emoji, setEmoji] = useState("\u{1F96A}");
  const [pickupWindow, setPickupWindow] = useState("\u0E1E\u0E31\u0E01\u0E01\u0E25\u0E32\u0E07\u0E27\u0E31\u0E19 12:15 - 12:45");
  const [description, setDescription] = useState("");
  const profit = price - cost;
  const isLoss = profit < 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || isLoss) return;
    addProduct({
      title,
      category,
      cost: Number(cost),
      price: Number(price),
      stock: Number(stock),
      emoji,
      pickupWindow,
      description: description || "\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E17\u0E33\u0E2A\u0E14\u0E43\u0E2B\u0E21\u0E48\u0E08\u0E32\u0E01\u0E19\u0E31\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19"
    });
    onClose();
  };
  return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-pop-in max-h-[92vh] overflow-y-auto" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between pb-4 border-b border-slate-100 mb-5" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2.5" }, /* @__PURE__ */ React.createElement("span", { className: "w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg" }, "\u2728"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "text-base font-bold text-slate-900" }, "\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32\u0E43\u0E2B\u0E21\u0E48 (\u0E25\u0E07\u0E02\u0E32\u0E22\u0E43\u0E19\u0E15\u0E25\u0E32\u0E14)"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500" }, "\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E10\u0E32\u0E19\u0E16\u0E39\u0E01\u0E0B\u0E34\u0E07\u0E01\u0E4C\u0E08\u0E32\u0E01\u0E1A\u0E17\u0E40\u0E23\u0E35\u0E22\u0E19\u0E17\u0E35\u0E48 1 \u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34"))), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: onClose,
      className: "w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm"
    },
    "\u2715"
  )), /* @__PURE__ */ React.createElement("form", { onSubmit: handleSubmit, className: "space-y-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "w-16" }, /* @__PURE__ */ React.createElement("label", { className: "text-xs font-bold text-slate-700 block mb-1" }, "\u0E44\u0E2D\u0E04\u0E2D\u0E19"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: emoji,
      onChange: (e) => setEmoji(e.target.value),
      className: "w-full py-2 text-center text-2xl border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React.createElement("label", { className: "text-xs font-bold text-slate-700 block mb-1" }, "\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      required: true,
      value: title,
      onChange: (e) => setTitle(e.target.value),
      placeholder: "\u0E40\u0E0A\u0E48\u0E19 \u0E41\u0E0B\u0E19\u0E14\u0E4C\u0E27\u0E34\u0E0A\u0E17\u0E39\u0E19\u0E48\u0E32 \u0E04\u0E2D\u0E23\u0E4C\u0E19\u0E2A\u0E25\u0E31\u0E14",
      className: "w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500"
    }
  ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-xs font-bold text-slate-700 block mb-1" }, "\u0E2B\u0E21\u0E27\u0E14\u0E2B\u0E21\u0E39\u0E48"), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: category,
      onChange: (e) => setCategory(e.target.value),
      className: "w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs text-slate-800"
    },
    /* @__PURE__ */ React.createElement("option", { value: "\u0E2D\u0E32\u0E2B\u0E32\u0E23 & \u0E40\u0E1A\u0E40\u0E01\u0E2D\u0E23\u0E35\u0E48" }, "\u0E2D\u0E32\u0E2B\u0E32\u0E23 & \u0E40\u0E1A\u0E40\u0E01\u0E2D\u0E23\u0E35\u0E48"),
    /* @__PURE__ */ React.createElement("option", { value: "\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E14\u0E37\u0E48\u0E21" }, "\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E14\u0E37\u0E48\u0E21"),
    /* @__PURE__ */ React.createElement("option", { value: "\u0E07\u0E32\u0E19\u0E04\u0E23\u0E32\u0E1F\u0E15\u0E4C & DIY" }, "\u0E07\u0E32\u0E19\u0E04\u0E23\u0E32\u0E1F\u0E15\u0E4C & DIY"),
    /* @__PURE__ */ React.createElement("option", { value: "\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E40\u0E02\u0E35\u0E22\u0E19 & \u0E0A\u0E35\u0E17\u0E2A\u0E23\u0E38\u0E1B" }, "\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E40\u0E02\u0E35\u0E22\u0E19 & \u0E0A\u0E35\u0E17\u0E2A\u0E23\u0E38\u0E1B"),
    /* @__PURE__ */ React.createElement("option", { value: "\u0E41\u0E1F\u0E0A\u0E31\u0E48\u0E19 & \u0E02\u0E2D\u0E07\u0E2A\u0E30\u0E2A\u0E21" }, "\u0E41\u0E1F\u0E0A\u0E31\u0E48\u0E19 & \u0E02\u0E2D\u0E07\u0E2A\u0E30\u0E2A\u0E21")
  )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-xs font-bold text-slate-700 block mb-1" }, "\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E15\u0E48\u0E2D\u0E0A\u0E34\u0E49\u0E19 (\u0E3F)", /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-emerald-600 block" }, "\u2728 Auto-Synced")), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      step: "0.5",
      required: true,
      value: cost,
      onChange: (e) => setCost(Number(e.target.value)),
      className: "w-full px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-bold bg-white"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-xs font-bold text-slate-700 block mb-1" }, "\u0E23\u0E32\u0E04\u0E32\u0E02\u0E32\u0E22\u0E17\u0E35\u0E48\u0E15\u0E31\u0E49\u0E07\u0E44\u0E27\u0E49 (\u0E3F)", /* @__PURE__ */ React.createElement("span", { className: `text-[10px] font-bold block ${isLoss ? "text-coral-500" : "text-emerald-600"}` }, isLoss ? "\u26A0\uFE0F \u0E23\u0E32\u0E04\u0E32\u0E02\u0E32\u0E22\u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E17\u0E38\u0E19" : `\u0E01\u0E33\u0E44\u0E23 \u0E3F${profit.toFixed(1)} / \u0E0A\u0E34\u0E49\u0E19`)), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      step: "1",
      required: true,
      value: price,
      onChange: (e) => setPrice(Number(e.target.value)),
      className: `w-full px-3 py-1.5 border rounded-xl text-xs font-bold bg-white ${isLoss ? "border-coral-400 text-coral-600" : "border-slate-200"}`
    }
  ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-3" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-xs font-bold text-slate-700 block mb-1" }, "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E2A\u0E15\u0E47\u0E2D\u0E01\u0E17\u0E35\u0E48\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E02\u0E32\u0E22"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      min: "1",
      required: true,
      value: stock,
      onChange: (e) => setStock(Number(e.target.value)),
      className: "w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-xs font-bold text-slate-700 block mb-1" }, "\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E19\u0E31\u0E14\u0E23\u0E31\u0E1A\u0E02\u0E2D\u0E07"), /* @__PURE__ */ React.createElement(
    "select",
    {
      value: pickupWindow,
      onChange: (e) => setPickupWindow(e.target.value),
      className: "w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
    },
    /* @__PURE__ */ React.createElement("option", { value: "\u0E1E\u0E31\u0E01\u0E01\u0E25\u0E32\u0E07\u0E27\u0E31\u0E19 12:15 - 12:45" }, "\u0E1E\u0E31\u0E01\u0E01\u0E25\u0E32\u0E07\u0E27\u0E31\u0E19 (12:15 - 12:45)"),
    /* @__PURE__ */ React.createElement("option", { value: "\u0E2B\u0E25\u0E31\u0E07\u0E40\u0E25\u0E34\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19 16:00 - 16:30" }, "\u0E2B\u0E25\u0E31\u0E07\u0E40\u0E25\u0E34\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19 (16:00 - 16:30)")
  ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-xs font-bold text-slate-700 block mb-1" }, "\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32\u0E2A\u0E31\u0E49\u0E19 \u0E46"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      rows: 2,
      value: description,
      onChange: (e) => setDescription(e.target.value),
      placeholder: "\u0E08\u0E38\u0E14\u0E40\u0E14\u0E48\u0E19\u0E02\u0E2D\u0E07\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32 \u0E27\u0E31\u0E15\u0E16\u0E38\u0E14\u0E34\u0E1A \u0E04\u0E27\u0E32\u0E21\u0E2D\u0E23\u0E48\u0E2D\u0E22 \u0E2B\u0E23\u0E37\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E19\u0E48\u0E32\u0E23\u0E31\u0E01",
      className: "w-full px-3.5 py-2 border border-slate-200 rounded-xl text-xs"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "pt-3 border-t border-slate-100 flex justify-end gap-2" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: onClose,
      className: "px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
    },
    "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "submit",
      disabled: isLoss || !title.trim(),
      className: "px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold text-xs shadow-md transition-colors"
    },
    "\u0E40\u0E1B\u0E34\u0E14\u0E02\u0E32\u0E22\u0E43\u0E19\u0E15\u0E25\u0E32\u0E14\u0E17\u0E31\u0E19\u0E17\u0E35 \u{1F680}"
  )))));
}
function TeacherEducatorView() {
  const { classes, selectedClassId, setSelectedClassId, telemetry, assignments, createAssignment } = useEdu();
  const currentClass = classes.find((c) => c.id === selectedClassId) || classes[0];
  const classTelemetry = telemetry.filter((t) => t.classId === selectedClassId);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedStudentLog, setSelectedStudentLog] = useState(null);
  const totalClassRevenue = classTelemetry.reduce((s, t) => s + t.totalRevenue, 0);
  const totalClassProfit = classTelemetry.reduce((s, t) => s + t.netProfit, 0);
  const avgStockAccuracy = Math.round(classTelemetry.reduce((s, t) => s + t.stockAccuracy, 0) / (classTelemetry.length || 1));
  const riskBadgeStyles = {
    "Aggressive Pricing": { bg: "bg-coral-100 text-coral-800 border-coral-300", dot: "bg-coral-500" },
    "Risk Averse": { bg: "bg-amber-100 text-amber-800 border-amber-300", dot: "bg-amber-500" },
    "Balanced Growth": { bg: "bg-emerald-100 text-emerald-800 border-emerald-300", dot: "bg-emerald-500" }
  };
  return /* @__PURE__ */ React.createElement("div", { className: "max-w-6xl mx-auto px-4 py-6 w-full animate-fade-in" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 mb-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-xl" }, "\u{1F469}\u{1F3FB}\u200D\u{1F3EB}"), /* @__PURE__ */ React.createElement("h1", { className: "text-xl font-extrabold text-slate-900" }, "\u0E41\u0E1C\u0E07\u0E04\u0E27\u0E1A\u0E04\u0E38\u0E21\u0E04\u0E38\u0E13\u0E04\u0E23\u0E39 (Classroom Telemetry)"), /* @__PURE__ */ React.createElement("span", { className: "bg-cyan-50 text-cyan-800 text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border border-cyan-200" }, "Class Code: ", currentClass.code)), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500" }, "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23\u0E15\u0E31\u0E14\u0E2A\u0E34\u0E19\u0E43\u0E08\u0E02\u0E2D\u0E07\u0E19\u0E31\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19 \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 \u0E41\u0E25\u0E30\u0E21\u0E2D\u0E1A\u0E2B\u0E21\u0E32\u0E22\u0E07\u0E32\u0E19\u0E18\u0E38\u0E23\u0E01\u0E34\u0E08")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 w-full md:w-auto" }, /* @__PURE__ */ React.createElement(
    "select",
    {
      value: selectedClassId,
      onChange: (e) => setSelectedClassId(e.target.value),
      className: "px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
    },
    classes.map((c) => /* @__PURE__ */ React.createElement("option", { key: c.id, value: c.id }, c.name))
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setShowTaskModal(true),
      className: "px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5 whitespace-nowrap"
    },
    /* @__PURE__ */ React.createElement("span", null, "\u2795"),
    /* @__PURE__ */ React.createElement("span", null, "\u0E21\u0E2D\u0E1A\u0E2B\u0E21\u0E32\u0E22\u0E20\u0E32\u0E23\u0E01\u0E34\u0E08")
  ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white p-4 rounded-2xl border border-slate-200 shadow-xs" }, /* @__PURE__ */ React.createElement("span", { className: "text-[11px] text-slate-400 font-bold block uppercase" }, "\u0E23\u0E49\u0E32\u0E19\u0E04\u0E49\u0E32\u0E19\u0E31\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19\u0E43\u0E19\u0E2B\u0E49\u0E2D\u0E07"), /* @__PURE__ */ React.createElement("span", { className: "text-2xl font-black text-slate-900 mt-1 block" }, classTelemetry.length, " \u0E23\u0E49\u0E32\u0E19"), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-emerald-600 font-medium" }, "\u0E40\u0E1B\u0E34\u0E14\u0E02\u0E32\u0E22\u0E04\u0E23\u0E1A\u0E17\u0E38\u0E01\u0E01\u0E25\u0E38\u0E48\u0E21")), /* @__PURE__ */ React.createElement("div", { className: "bg-white p-4 rounded-2xl border border-slate-200 shadow-xs" }, /* @__PURE__ */ React.createElement("span", { className: "text-[11px] text-slate-400 font-bold block uppercase" }, "\u0E22\u0E2D\u0E14\u0E02\u0E32\u0E22\u0E23\u0E27\u0E21\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E49\u0E2D\u0E07"), /* @__PURE__ */ React.createElement("span", { className: "text-2xl font-black text-emerald-600 mt-1 block" }, "\u0E3F", totalClassRevenue.toLocaleString()), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-500 font-medium" }, "\u0E08\u0E32\u0E01\u0E15\u0E25\u0E32\u0E14\u0E19\u0E31\u0E14\u0E43\u0E19\u0E42\u0E23\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19")), /* @__PURE__ */ React.createElement("div", { className: "bg-white p-4 rounded-2xl border border-slate-200 shadow-xs" }, /* @__PURE__ */ React.createElement("span", { className: "text-[11px] text-slate-400 font-bold block uppercase" }, "\u0E01\u0E33\u0E44\u0E23\u0E2A\u0E38\u0E17\u0E18\u0E34\u0E23\u0E27\u0E21"), /* @__PURE__ */ React.createElement("span", { className: "text-2xl font-black text-brand-lime mt-1 block bg-slate-900 px-2 py-0.5 rounded-lg inline-block text-lg" }, "\u0E3F", totalClassProfit.toLocaleString()), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-500 font-medium block mt-1" }, "\u0E2B\u0E25\u0E31\u0E07\u0E2B\u0E31\u0E01\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32")), /* @__PURE__ */ React.createElement("div", { className: "bg-white p-4 rounded-2xl border border-slate-200 shadow-xs" }, /* @__PURE__ */ React.createElement("span", { className: "text-[11px] text-slate-400 font-bold block uppercase" }, "\u0E04\u0E27\u0E32\u0E21\u0E41\u0E21\u0E48\u0E19\u0E22\u0E33\u0E2A\u0E15\u0E47\u0E2D\u0E01\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22"), /* @__PURE__ */ React.createElement("span", { className: "text-2xl font-black text-slate-800 mt-1 block" }, avgStockAccuracy, "%"), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-500 font-medium" }, "\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E1C\u0E25\u0E34\u0E15\u0E15\u0E23\u0E07\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23"))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-8" }, /* @__PURE__ */ React.createElement("div", { className: "p-5 border-b border-slate-100 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-sm font-bold text-slate-900" }, "\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23\u0E15\u0E31\u0E14\u0E2A\u0E34\u0E19\u0E43\u0E08\u0E41\u0E25\u0E30\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 (Decision Telemetry)"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 mt-0.5" }, "\u0E23\u0E30\u0E1A\u0E1A\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E04\u0E27\u0E32\u0E21\u0E16\u0E35\u0E48\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E31\u0E1A\u0E23\u0E32\u0E04\u0E32 \u0E04\u0E27\u0E32\u0E21\u0E41\u0E21\u0E48\u0E19\u0E22\u0E33\u0E43\u0E19\u0E01\u0E32\u0E23\u0E04\u0E38\u0E21\u0E2A\u0E15\u0E47\u0E2D\u0E01 \u0E41\u0E25\u0E30\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E1E\u0E24\u0E15\u0E34\u0E01\u0E23\u0E23\u0E21\u0E18\u0E38\u0E23\u0E01\u0E34\u0E08\u0E02\u0E2D\u0E07\u0E19\u0E31\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19"))), /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full text-left text-xs" }, /* @__PURE__ */ React.createElement("thead", { className: "bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold uppercase text-[10px]" }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { className: "py-3 px-4" }, "\u0E19\u0E31\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19 / \u0E23\u0E49\u0E32\u0E19\u0E04\u0E49\u0E32"), /* @__PURE__ */ React.createElement("th", { className: "py-3 px-4 text-center" }, "\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E31\u0E1A\u0E23\u0E32\u0E04\u0E32"), /* @__PURE__ */ React.createElement("th", { className: "py-3 px-4 text-center" }, "\u0E04\u0E27\u0E32\u0E21\u0E41\u0E21\u0E48\u0E19\u0E22\u0E33\u0E2A\u0E15\u0E47\u0E2D\u0E01"), /* @__PURE__ */ React.createElement("th", { className: "py-3 px-4 text-center" }, "\u0E2A\u0E34\u0E19\u0E04\u0E49\u0E32\u0E04\u0E49\u0E32\u0E07 (Dead Stock)"), /* @__PURE__ */ React.createElement("th", { className: "py-3 px-4" }, "Risk Profile (\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07)"), /* @__PURE__ */ React.createElement("th", { className: "py-3 px-4 text-right" }, "\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23"))), /* @__PURE__ */ React.createElement("tbody", { className: "divide-y divide-slate-100 font-medium text-slate-700" }, classTelemetry.map((student) => {
    const badge = riskBadgeStyles[student.riskProfile] || riskBadgeStyles["Balanced Growth"];
    return /* @__PURE__ */ React.createElement("tr", { key: student.studentId, className: "hover:bg-slate-50/70 transition-colors" }, /* @__PURE__ */ React.createElement("td", { className: "py-3 px-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-xl" }, student.avatar), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "font-bold text-slate-900" }, student.studentName), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-slate-500" }, student.storeName)))), /* @__PURE__ */ React.createElement("td", { className: "py-3 px-4 text-center" }, /* @__PURE__ */ React.createElement("span", { className: "bg-slate-100 text-slate-800 px-2 py-0.5 rounded-full font-bold" }, student.priceAdjustments, " \u0E04\u0E23\u0E31\u0E49\u0E07")), /* @__PURE__ */ React.createElement("td", { className: "py-3 px-4 text-center" }, /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-900" }, student.stockAccuracy, "%")), /* @__PURE__ */ React.createElement("td", { className: "py-3 px-4 text-center" }, /* @__PURE__ */ React.createElement("span", { className: student.deadStockCount > 2 ? "text-coral-600 font-bold" : "text-slate-600" }, student.deadStockCount, " \u0E0A\u0E34\u0E49\u0E19")), /* @__PURE__ */ React.createElement("td", { className: "py-3 px-4" }, /* @__PURE__ */ React.createElement("span", { className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${badge.bg}` }, /* @__PURE__ */ React.createElement("span", { className: `w-1.5 h-1.5 rounded-full ${badge.dot}` }), /* @__PURE__ */ React.createElement("span", null, student.riskProfile))), /* @__PURE__ */ React.createElement("td", { className: "py-3 px-4 text-right" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setSelectedStudentLog(student),
        className: "text-xs text-brand-600 hover:text-brand-700 font-bold hover:underline"
      },
      "\u0E14\u0E39\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34 \u2794"
    )));
  }))))), /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-3xl p-5 border border-slate-200 shadow-sm" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ React.createElement("h2", { className: "text-sm font-bold text-slate-900" }, "\u0E20\u0E32\u0E23\u0E01\u0E34\u0E08\u0E17\u0E35\u0E48\u0E21\u0E2D\u0E1A\u0E2B\u0E21\u0E32\u0E22\u0E43\u0E19\u0E2B\u0E49\u0E2D\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19 (", assignments.length, ")")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, assignments.map((a) => /* @__PURE__ */ React.createElement("div", { key: a.id, className: "p-4 rounded-2xl bg-slate-50 border border-slate-200" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between mb-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-slate-900" }, a.title), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-400" }, "\u0E04\u0E23\u0E1A\u0E01\u0E33\u0E2B\u0E19\u0E14: ", a.due)), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-600 mb-3 leading-relaxed" }, a.description), /* @__PURE__ */ React.createElement("div", { className: "text-[11px] text-slate-500 flex justify-between items-center pt-2 border-t border-slate-200" }, /* @__PURE__ */ React.createElement("span", null, "\u0E2A\u0E48\u0E07\u0E07\u0E32\u0E19\u0E41\u0E25\u0E49\u0E27 ", a.submissionsCount, " / ", a.totalStudents, " \u0E04\u0E19"), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-600 font-bold" }, "\u0E40\u0E1B\u0E34\u0E14\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E2A\u0E48\u0E07")))))), selectedStudentLog && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-pop-in" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between pb-3 border-b border-slate-100 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2.5" }, /* @__PURE__ */ React.createElement("span", { className: "text-2xl" }, selectedStudentLog.avatar), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { className: "text-sm font-bold text-slate-900" }, "\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23\u0E15\u0E31\u0E14\u0E2A\u0E34\u0E19\u0E43\u0E08: ", selectedStudentLog.studentName), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500" }, selectedStudentLog.storeName))), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setSelectedStudentLog(null),
      className: "w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs"
    },
    "\u2715"
  )), /* @__PURE__ */ React.createElement("div", { className: "space-y-3 mb-5 max-h-[300px] overflow-y-auto" }, selectedStudentLog.adjustmentHistory.map((item, idx) => /* @__PURE__ */ React.createElement("div", { key: idx, className: "p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between font-bold text-slate-900 mb-1" }, /* @__PURE__ */ React.createElement("span", null, "\u0E1B\u0E23\u0E31\u0E1A\u0E23\u0E32\u0E04\u0E32: ", item.oldPrice, "\u0E3F \u2794 ", item.newPrice, "\u0E3F"), /* @__PURE__ */ React.createElement("span", { className: "text-slate-400 font-normal" }, item.date)), /* @__PURE__ */ React.createElement("div", { className: "text-slate-600 text-[11px]" }, /* @__PURE__ */ React.createElement("b", null, "\u0E40\u0E2B\u0E15\u0E38\u0E1C\u0E25\u0E19\u0E31\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19:"), " ", item.reason)))), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setSelectedStudentLog(null),
      className: "w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
    },
    "\u0E1B\u0E34\u0E14\u0E2B\u0E19\u0E49\u0E32\u0E15\u0E48\u0E32\u0E07"
  ))), showTaskModal && /* @__PURE__ */ React.createElement(
    CreateAssignmentModal,
    {
      classId: selectedClassId,
      onClose: () => setShowTaskModal(false)
    }
  ));
}
function CreateAssignmentModal({ classId, onClose }) {
  const { createAssignment } = useEdu();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due, setDue] = useState("2026-11-30");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    createAssignment({ title, description, due, classId });
    onClose();
  };
  return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-pop-in" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between pb-3 border-b border-slate-100 mb-4" }, /* @__PURE__ */ React.createElement("h3", { className: "text-sm font-bold text-slate-900" }, "\u0E21\u0E2D\u0E1A\u0E2B\u0E21\u0E32\u0E22\u0E20\u0E32\u0E23\u0E01\u0E34\u0E08\u0E18\u0E38\u0E23\u0E01\u0E34\u0E08\u0E43\u0E2B\u0E21\u0E48"), /* @__PURE__ */ React.createElement("button", { onClick: onClose, className: "text-slate-400 hover:text-slate-600" }, "\u2715")), /* @__PURE__ */ React.createElement("form", { onSubmit: handleSubmit, className: "space-y-3.5" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-xs font-bold text-slate-700 block mb-1" }, "\u0E0A\u0E37\u0E48\u0E2D\u0E20\u0E32\u0E23\u0E01\u0E34\u0E08"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      required: true,
      value: title,
      onChange: (e) => setTitle(e.target.value),
      placeholder: "\u0E40\u0E0A\u0E48\u0E19 \u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E1B\u0E23\u0E42\u0E21\u0E0A\u0E31\u0E48\u0E19\u0E25\u0E14\u0E02\u0E2D\u0E07\u0E40\u0E2A\u0E35\u0E22\u0E0A\u0E48\u0E27\u0E07\u0E1E\u0E31\u0E01\u0E01\u0E25\u0E32\u0E07\u0E27\u0E31\u0E19",
      className: "w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-xs font-bold text-slate-700 block mb-1" }, "\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E41\u0E25\u0E30\u0E2A\u0E34\u0E48\u0E07\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E2A\u0E48\u0E07"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      rows: 3,
      required: true,
      value: description,
      onChange: (e) => setDescription(e.target.value),
      placeholder: "\u0E43\u0E2B\u0E49\u0E19\u0E31\u0E01\u0E40\u0E23\u0E35\u0E22\u0E19\u0E04\u0E33\u0E19\u0E27\u0E13\u0E41\u0E25\u0E30\u0E2D\u0E18\u0E34\u0E1A\u0E32\u0E22\u0E40\u0E2B\u0E15\u0E38\u0E1C\u0E25\u0E01\u0E32\u0E23\u0E15\u0E31\u0E49\u0E07\u0E23\u0E32\u0E04\u0E32\u0E2B\u0E23\u0E37\u0E2D\u0E42\u0E1B\u0E23\u0E42\u0E21\u0E0A\u0E31\u0E48\u0E19...",
      className: "w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "text-xs font-bold text-slate-700 block mb-1" }, "\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E2A\u0E48\u0E07 (Due Date)"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "date",
      value: due,
      onChange: (e) => setDue(e.target.value),
      className: "w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "pt-3 border-t border-slate-100 flex justify-end gap-2" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: onClose,
      className: "px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
    },
    "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "submit",
      className: "px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md"
    },
    "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E01\u0E32\u0E23\u0E21\u0E2D\u0E1A\u0E2B\u0E21\u0E32\u0E22 \u{1F4CB}"
  )))));
}
function App() {
  const { mode } = useEdu();
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-full flex flex-col bg-slate-50" }, /* @__PURE__ */ React.createElement(TopRoleSwitcher, null), /* @__PURE__ */ React.createElement("main", { className: "flex-1 pb-16" }, mode === "buyer" && /* @__PURE__ */ React.createElement(StudentBuyerView, null), mode === "seller" && /* @__PURE__ */ React.createElement(StudentSellerView, null), mode === "teacher" && /* @__PURE__ */ React.createElement(TeacherEducatorView, null)), /* @__PURE__ */ React.createElement("footer", { className: "w-full border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-400" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-2 font-bold text-slate-700" }, /* @__PURE__ */ React.createElement("span", { className: "w-5 h-5 rounded bg-brand-lime text-slate-950 flex items-center justify-center text-[10px] font-black" }, "em"), /* @__PURE__ */ React.createElement("span", null, "EduMarket \xB7 \u0E42\u0E23\u0E07\u0E40\u0E23\u0E35\u0E22\u0E19\u0E2A\u0E32\u0E18\u0E34\u0E15\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E2A\u0E23\u0E23\u0E04\u0E4C")), /* @__PURE__ */ React.createElement("p", { className: "text-[11px]" }, "High-Fidelity EdTech Prototype \xB7 Persistent State & Realtime Order Fulfillment"))));
}
var container = document.getElementById("root");
var root = createRoot(container);
root.render(
  /* @__PURE__ */ React.createElement(AppProvider, null, /* @__PURE__ */ React.createElement(App, null))
);
export {
  AppProvider,
  useEdu
};
