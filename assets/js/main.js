/**
 * Punjab's Attire - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('notify-form');
    const emailInput = document.getElementById('email-input');
    const feedback = document.getElementById('notify-feedback');
    const btn = document.getElementById('notify-btn');

    // Check if user previously subscribed
    const savedEmail = localStorage.getItem('pa_subscribed_email');
    if (savedEmail && feedback) {
        feedback.innerHTML = `
            <span class="text-[#e5a93c] font-medium">
                ✨ You're already on our VIP waitlist (${savedEmail})! We'll notify you first.
            </span>
        `;
        feedback.classList.remove('hidden');
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = emailInput.value.trim();
            if (!email) return;

            // Persist subscription in browser storage
            localStorage.setItem('pa_subscribed_email', email);

            // Update button visual state
            if (btn) {
                btn.disabled = true;
                btn.innerHTML = `✓ NOTIFIED`;
                btn.classList.add('opacity-80', 'cursor-default');
            }

            // Display friendly success feedback
            if (feedback) {
                feedback.innerHTML = `
                    <div class="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs sm:text-sm shadow-lg">
                        🎉 <strong>Thank you!</strong> You're on our exclusive launch list. 
                        <a href="https://chat.whatsapp.com/Fs37cZAzrcT5xDpqOVY6xR?s=cl&p=a&mlu=4&ilr=4" target="_blank" rel="noopener noreferrer" class="underline text-[#e5a93c] font-semibold hover:text-yellow-200 ml-1">
                            Join our WhatsApp Group
                        </a> for instant sneak peeks!
                    </div>
                `;
                feedback.classList.remove('hidden');
            }

            emailInput.value = '';
        });
    }
});

