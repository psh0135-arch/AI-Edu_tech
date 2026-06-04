import { onValueCreated } from 'firebase-functions/v2/database'
import * as nodemailer from 'nodemailer'

// ── 이메일 트랜스포터 ──────────────────────────────────────────────────────────
function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  })
}

// ── 수강신청 생성 시 이메일 자동발송 ───────────────────────────────────────────
export const onEnrollmentCreated = onValueCreated(
  {
    ref: '/enrollments/{enrollmentId}',
    region: 'asia-southeast1', // 데이터베이스와 같은 리전
    instance: 'vibe-coding-backend-a96b0-default-rtdb',
  },
  async (event) => {
    const data = event.data.val() as {
      name: string
      email: string
      phone: string
      affiliation?: string
      aiLevel?: string
      goal?: string
    }

    if (!data?.email) {
      console.log('이메일 주소 없음, 발송 건너뜀')
      return
    }

    const transporter = createTransporter()

    // ── 신청자에게 확인 이메일 ────────────────────────────────────────────────
    const applicantMail = {
      from: `"AI마케팅 교육팀" <${process.env.GMAIL_USER}>`,
      to: data.email,
      subject: '[수강신청 완료] AI 활용 디지털 콘텐츠 마케팅 신청이 완료되었습니다',
      html: `
        <div style="font-family: 'Apple SD Gothic Neo', Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #ffffff;">

          <!-- 헤더 -->
          <div style="background: linear-gradient(135deg, #7C3AED, #06B6D4); padding: 32px 24px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">
              ⚡ AI마케팅 교육팀
            </h1>
            <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">
              수강신청이 완료되었습니다
            </p>
          </div>

          <!-- 본문 -->
          <div style="background: #f8fafc; padding: 32px 24px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">

            <p style="color: #1e293b; font-size: 16px; margin: 0 0 24px;">
              안녕하세요, <strong>${data.name}</strong>님! 👋
            </p>
            <p style="color: #475569; font-size: 14px; line-height: 1.8; margin: 0 0 24px;">
              <strong>AI 활용 디지털 콘텐츠 마케팅</strong> 수강신청이 정상적으로 접수되었습니다.<br/>
              담당자가 빠른 시일 내에 <strong>${data.phone}</strong>으로 연락드리겠습니다.
            </p>

            <!-- 수강 정보 카드 -->
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; margin: 0 0 24px;">
              <p style="color: #7C3AED; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 14px;">
                📋 수강 정보
              </p>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="color: #94a3b8; font-size: 13px; padding: 6px 0; width: 90px;">수강과목</td>
                  <td style="color: #1e293b; font-size: 13px; font-weight: 600; padding: 6px 0;">AI 활용 디지털 콘텐츠 마케팅</td>
                </tr>
                <tr>
                  <td style="color: #94a3b8; font-size: 13px; padding: 6px 0;">수강금액</td>
                  <td style="color: #7C3AED; font-size: 13px; font-weight: 700; padding: 6px 0;">150,000원</td>
                </tr>
                <tr>
                  <td style="color: #94a3b8; font-size: 13px; padding: 6px 0;">신청자</td>
                  <td style="color: #1e293b; font-size: 13px; padding: 6px 0;">${data.name} (${data.phone})</td>
                </tr>
                ${data.affiliation ? `
                <tr>
                  <td style="color: #94a3b8; font-size: 13px; padding: 6px 0;">소속</td>
                  <td style="color: #1e293b; font-size: 13px; padding: 6px 0;">${data.affiliation}</td>
                </tr>` : ''}
              </table>
            </div>

            <!-- 안내 -->
            <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 14px 16px; border-radius: 0 8px 8px 0; margin: 0 0 24px;">
              <p style="color: #1e40af; font-size: 13px; margin: 0; line-height: 1.7;">
                📞 <strong>다음 단계</strong>: 담당자가 신청 내용을 확인 후 입금 안내 및 수업 일정을 안내드립니다.
              </p>
            </div>

            <p style="color: #94a3b8; font-size: 12px; text-align: center; margin: 0;">
              문의사항이 있으시면 <strong>psh0135@gmail.com</strong>으로 연락 주세요.<br/>
              감사합니다. 😊
            </p>
          </div>
        </div>
      `,
    }

    // ── 관리자에게 알림 이메일 ────────────────────────────────────────────────
    const adminMail = {
      from: `"AI마케팅 수강신청 알림" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `[새 수강신청] ${data.name}님이 신청하셨습니다`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px;">
          <h2 style="color: #7C3AED;">새 수강신청 접수</h2>
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 8px; color: #666;">이름</td><td style="padding: 8px; font-weight: bold;">${data.name}</td></tr>
            <tr><td style="padding: 8px; color: #666;">연락처</td><td style="padding: 8px;">${data.phone}</td></tr>
            <tr><td style="padding: 8px; color: #666;">이메일</td><td style="padding: 8px;">${data.email}</td></tr>
            <tr><td style="padding: 8px; color: #666;">소속</td><td style="padding: 8px;">${data.affiliation || '-'}</td></tr>
            <tr><td style="padding: 8px; color: #666;">AI 수준</td><td style="padding: 8px;">${data.aiLevel || '-'}</td></tr>
            <tr><td style="padding: 8px; color: #666;">수강 목표</td><td style="padding: 8px;">${data.goal || '-'}</td></tr>
          </table>
          <p><a href="https://psh0135-arch.github.io/AI-Edu_tech/#admin" style="background: #7C3AED; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none;">관리자 대시보드 바로가기</a></p>
        </div>
      `,
    }

    try {
      await Promise.all([
        transporter.sendMail(applicantMail),
        transporter.sendMail(adminMail),
      ])
      console.log(`✅ 이메일 발송 완료: ${data.name} <${data.email}>`)
    } catch (err) {
      console.error('❌ 이메일 발송 실패:', err)
    }
  }
)
