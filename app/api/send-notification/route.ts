import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { applicationId, status, userEmail, userName, serviceName, referenceNumber, adminNotes } =
      await request.json()

    // Create email content based on status
    let subject = ""
    let htmlContent = ""

    switch (status) {
      case "approved":
        subject = `Application Approved - ${serviceName} (${referenceNumber})`
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #10b981; color: white; padding: 20px; text-align: center;">
              <h1>Application Approved ✅</h1>
            </div>
            <div style="padding: 20px; background-color: #f9fafb;">
              <p>Dear ${userName},</p>
              <p>Great news! Your application has been <strong>approved</strong>.</p>
              
              <div style="background-color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h3>Application Details:</h3>
                <p><strong>Service:</strong> ${serviceName}</p>
                <p><strong>Reference Number:</strong> ${referenceNumber}</p>
                <p><strong>Status:</strong> Approved</p>
                ${adminNotes ? `<p><strong>Notes:</strong> ${adminNotes}</p>` : ""}
              </div>
              
              <p>You can now download your approved documents from your dashboard.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://masaku-e-services.vercel.app/dashboard" 
                   style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  View Dashboard
                </a>
              </div>
              
              <p>Thank you for using Masaku e-Services.</p>
              <p>Best regards,<br>Machakos County Government</p>
            </div>
          </div>
        `
        break

      case "rejected":
        subject = `Application Update Required - ${serviceName} (${referenceNumber})`
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #ef4444; color: white; padding: 20px; text-align: center;">
              <h1>Application Requires Attention ⚠️</h1>
            </div>
            <div style="padding: 20px; background-color: #f9fafb;">
              <p>Dear ${userName},</p>
              <p>Your application requires additional documentation or corrections.</p>
              
              <div style="background-color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h3>Application Details:</h3>
                <p><strong>Service:</strong> ${serviceName}</p>
                <p><strong>Reference Number:</strong> ${referenceNumber}</p>
                <p><strong>Status:</strong> Requires Update</p>
                ${adminNotes ? `<p><strong>Required Actions:</strong> ${adminNotes}</p>` : ""}
              </div>
              
              <p>Please review the requirements and resubmit your application with the necessary documents.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://masaku-e-services.vercel.app/dashboard" 
                   style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  View Dashboard
                </a>
              </div>
              
              <p>If you have questions, please contact us at info@masaku-e-services.go.ke</p>
              <p>Best regards,<br>Machakos County Government</p>
            </div>
          </div>
        `
        break

      case "processing":
        subject = `Application Under Review - ${serviceName} (${referenceNumber})`
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #f59e0b; color: white; padding: 20px; text-align: center;">
              <h1>Application Under Review 🔄</h1>
            </div>
            <div style="padding: 20px; background-color: #f9fafb;">
              <p>Dear ${userName},</p>
              <p>Your application is currently being reviewed by our team.</p>
              
              <div style="background-color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h3>Application Details:</h3>
                <p><strong>Service:</strong> ${serviceName}</p>
                <p><strong>Reference Number:</strong> ${referenceNumber}</p>
                <p><strong>Status:</strong> Under Review</p>
                ${adminNotes ? `<p><strong>Notes:</strong> ${adminNotes}</p>` : ""}
              </div>
              
              <p>We will notify you once the review is complete. This typically takes 3-5 business days.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://masaku-e-services.vercel.app/dashboard" 
                   style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  View Dashboard
                </a>
              </div>
              
              <p>Thank you for your patience.</p>
              <p>Best regards,<br>Machakos County Government</p>
            </div>
          </div>
        `
        break

      default:
        return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    // Here you would integrate with your email service (SendGrid, Resend, etc.)
    // For now, we'll simulate sending the email
    console.log("Sending email notification:", {
      to: userEmail,
      subject,
      html: htmlContent,
    })

    // In a real implementation, you would use an email service like:
    // await sendEmail({
    //   to: userEmail,
    //   subject,
    //   html: htmlContent
    // })

    return NextResponse.json({
      success: true,
      message: "Notification sent successfully",
    })
  } catch (error) {
    console.error("Error sending notification:", error)
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 })
  }
}
