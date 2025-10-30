import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

// --- CREATE REPORT ---
export const createReport = async (req, res) => {
  try {
    const { user_id, gps_lat, gps_long, severity, description } = req.body;

    if (!user_id || !gps_lat || !gps_long || !severity) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newReport = await prisma.report.create({
      data: { user_id, gps_lat, gps_long, severity, description },
    });

    console.log("✅ New report saved:", newReport);

    // === EMAIL ALERT SYSTEM ===
    if (severity.toLowerCase() === "grave" || severity.toLowerCase() === "critique") {
      await sendEmergencyEmail(newReport);
    }

    return res.status(201).json(newReport);
  } catch (err) {
    console.error("❌ Error creating report:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// --- GET ALL REPORTS ---
export const getAllReports = async (req, res) => {
  try {
    const reports = await prisma.report.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(reports);
  } catch (err) {
    console.error("❌ Error fetching reports:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// --- EMAIL FUNCTION ---
const sendEmergencyEmail = async (report) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const message = `
🚨 URGENT — Signalement d'accident 🚨

Gravité : ${report.severity}
Description : ${report.description}
Localisation : Latitude ${report.gps_lat}, Longitude ${report.gps_long}

Veuillez dépêcher une unité immédiatement.
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "hopital@example.com, police@example.com",
      subject: "🚨 URGENT : Nouveau signalement d'accident",
      text: message,
    });

    console.log("📨 Alerte envoyée aux services d’urgence");
  } catch (err) {
    console.error("⚠️ Échec d’envoi d’email :", err);
  }
};
