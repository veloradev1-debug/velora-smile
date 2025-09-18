document.addEventListener("DOMContentLoaded", () => {
  // Flatpickr setup
flatpickr("#preferredDate", {
  minDate: "today",   // يمنع اختيار تاريخ قديم
  dateFormat: "Y-m-d", // شكل التاريخ
  disableMobile: true, // حتى لا يفتح DatePicker الافتراضي في الهواتف
});

  const form = document.getElementById("bookingForm");
  const messageEl = document.getElementById("formMessage");

  /* Custom Dropdown */
  const customSelect = document.querySelector(".custom-select");
  const trigger = customSelect.querySelector(".custom-select-trigger span");
  const arrow = customSelect.querySelector(".arrow");
  const options = customSelect.querySelectorAll(".custom-option");
  const hiddenInput = document.getElementById("service");

  customSelect.querySelector(".custom-select-trigger").addEventListener("click", () => {
    customSelect.classList.toggle("open");
  });

  options.forEach(option => {
    option.addEventListener("click", () => {
      trigger.textContent = option.textContent;
      hiddenInput.value = option.dataset.value;
      customSelect.classList.remove("open");
    });
  });

  document.addEventListener("click", (e) => {
    if (!customSelect.contains(e.target)) {
      customSelect.classList.remove("open");
    }
  });

  /* Form submit */
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    messageEl.textContent = "";
    messageEl.style.color = "";

    if (!form.checkValidity() || !hiddenInput.value) {
      messageEl.style.color = "red";
      messageEl.textContent = "Please fill out all fields correctly.";
      return;
    }

    const formData = {
      fullName: form.fullName.value.trim(),
      phoneNumber: form.phoneNumber.value.trim(),
      service: hiddenInput.value,
      preferredDate: form.preferredDate.value,
    };

    messageEl.style.color = "#007bff";
    messageEl.textContent = "Sending your request...";

    setTimeout(() => {
      messageEl.textContent = `Thank you, ${formData.fullName}! Your appointment request for ${formData.service.replace(/_/g, " ")} on ${formData.preferredDate} has been received. We will contact you shortly.`;
      form.reset();
      trigger.textContent = "Select a service";
      hiddenInput.value = "";
      preferredDate.min = new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .split("T")[0];
    }, 1500);
  });

  /* Scroll to form when clicking book button */
  const bookBtn = document.getElementById('bookBtnHeader');
  if (bookBtn) {
    bookBtn.addEventListener('click', function () {
      window.location.href = '#booking-form'; 
    });
  }
});
