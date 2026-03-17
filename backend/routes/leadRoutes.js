const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const nodemailer = require('nodemailer');
const fetch = require('node-fetch');

// Helper to send to Google Sheets via Apps Script
const sendToGoogleSheet = async (lead) => {
    if (!process.env.GOOGLE_SHEET_URL) {
        console.warn('GOOGLE_SHEET_URL missing. Google Sheet sync skipped.');
        return;
    }
    try {
        await fetch(process.env.GOOGLE_SHEET_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify({
                name: lead.name,
                mobile: lead.mobile,
                configuration: lead.configuration,
                preferredLocation: lead.preferredLocation,
                projectStatus: lead.projectStatus
            })
        });
        console.log('Lead sent to Google Sheet successfully');
    } catch (error) {
        console.error('Error sending lead to Google Sheet:', error);
    }
};

// Helper to send email
const sendLeadEmail = async (lead) => {
    // Check if email credentials exist
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn('Email credentials missing. Email notification skipped.');
        return;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: `"99 Homes Website" <${process.env.EMAIL_USER}>`,
        to: 'mayur99homes@gmail.com',
        subject: `New Lead: ${lead.name} - ${lead.configuration}`,
        text: `
            New inquiry received from website:
            
            Name: ${lead.name}
            Mobile: ${lead.mobile}
            Configuration: ${lead.configuration}
            Preferred Location: ${lead.preferredLocation}
            Project Status: ${lead.projectStatus}
            Date: ${new Date().toLocaleString()}
        `,
        html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
                <h2 style="color: #073B3A;">New Property Inquiry</h2>
                <p><strong>Name:</strong> ${lead.name}</p>
                <p><strong>Mobile:</strong> ${lead.mobile}</p>
                <p><strong>Configuration:</strong> ${lead.configuration}</p>
                <p><strong>Preferred Location:</strong> ${lead.preferredLocation}</p>
                <p><strong>Project Status:</strong> ${lead.projectStatus}</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                <p style="font-size: 12px; color: #666;">This is an automated message from 99 Homes Website.</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Lead email notification sent successfully');
    } catch (error) {
        console.error('Error sending lead email:', error);
    }
};

// POST /api/leads - Create a new lead
router.post('/', async (req, res) => {
    try {
        const { name, mobile, configuration, preferredLocation, projectStatus } = req.body;

        // Simple validation
        if (!name || !mobile || !configuration || !preferredLocation || !projectStatus) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const newLead = new Lead({
            name,
            mobile,
            configuration,
            preferredLocation,
            projectStatus
        });

        const savedLead = await newLead.save();

        // Asynchronously send email and sync to Google Sheet
        sendLeadEmail(savedLead);
        sendToGoogleSheet(savedLead);

        res.status(201).json({
            success: true,
            message: 'Inquiry submitted successfully',
            data: savedLead
        });
    } catch (error) {
        console.error('Error saving lead:', error);
        res.status(500).json({ success: false, message: 'Server error while saving inquiry' });
    }
});

module.exports = router;
