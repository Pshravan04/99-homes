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
        console.log('Attempting to sync lead to Google Sheet:', lead.name);
        const response = await fetch(process.env.GOOGLE_SHEET_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify({
                name: lead.name,
                mobile: lead.mobile,
                configuration: lead.configuration,
                preferredLocation: lead.preferredLocation,
                projectStatus: lead.projectStatus
            }),
            redirect: 'follow'
        });

        if (response.ok) {
            const result = await response.text();
            console.log('Google Sheet Sync SUCCESS:', result);
        } else {
            console.error('Google Sheet Sync FAILED. Status:', response.status);
        }
    } catch (error) {
        console.error('Google Sheet Sync ERROR:', error.message);
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

// GET /api/leads - Get all leads (Admin only)
router.get('/', async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.status(200).json(leads);
    } catch (error) {
        console.error('Error fetching leads:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching leads' });
    }
});

// GET /api/leads/:id - Get a single lead
router.get('/:id', async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
        res.status(200).json(lead);
    } catch (error) {
        console.error('Error fetching lead:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching lead' });
    }
});

// PUT /api/leads/:id - Update a lead
router.put('/:id', async (req, res) => {
    try {
        const updatedLead = await Lead.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedLead) return res.status(404).json({ success: false, message: 'Lead not found' });
        res.status(200).json({ success: true, data: updatedLead });
    } catch (error) {
        console.error('Error updating lead:', error);
        res.status(500).json({ success: false, message: 'Server error while updating lead' });
    }
});

// DELETE /api/leads/:id - Delete a lead
router.delete('/:id', async (req, res) => {
    try {
        const deletedLead = await Lead.findByIdAndDelete(req.params.id);
        if (!deletedLead) return res.status(404).json({ success: false, message: 'Lead not found' });
        res.status(200).json({ success: true, message: 'Lead deleted successfully' });
    } catch (error) {
        console.error('Error deleting lead:', error);
        res.status(500).json({ success: false, message: 'Server error while deleting lead' });
    }
});

module.exports = router;
