document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("mainNavbar");
  const billRange = document.getElementById("billRange");
  const billAmountEl = document.getElementById("billAmount");
  const youPayEl = document.getElementById("youPay");
  const savingsEl = document.getElementById("savings");
  const dropzone = document.getElementById("dropzone");
  const dropzoneText = document.getElementById("dropzoneText");

  function formatCurrency(amount) {
    return `₹${amount.toLocaleString("en-IN")}`;
  }

  function updateCalculator() {
    const billAmount = Number(billRange.value);
    const savings = Math.round(billAmount * 0.10);
    const youPay = billAmount - savings;

    billAmountEl.textContent = formatCurrency(billAmount);
    youPayEl.textContent = formatCurrency(youPay);
    savingsEl.textContent = formatCurrency(savings);
  }

  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
      navbar.classList.remove("navbar-dark");
      navbar.classList.add("navbar-light");
    } else {
      navbar.classList.remove("scrolled");
      navbar.classList.remove("navbar-light");
      navbar.classList.add("navbar-dark");
    }
  }

  function simulateScan(fileName) {
    dropzone.classList.remove("success");
    dropzone.classList.add("scanning");
    dropzoneText.textContent = `Scanning "${fileName}"...`;

    setTimeout(() => {
      dropzone.classList.remove("scanning");
      dropzone.classList.add("success");
      dropzoneText.textContent = `Success. "${fileName}" scanned successfully.`;
    }, 2200);
  }

  billRange.addEventListener("input", updateCalculator);
  window.addEventListener("scroll", handleNavbarScroll);

  ["dragenter", "dragover"].forEach((eventName) => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add("dragover");
    });
  });

  ["dragleave", "drop"].forEach((eventName) => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove("dragover");
    });
  });

  dropzone.addEventListener("drop", (e) => {
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      simulateScan(files[0].name);
    }
  });

  updateCalculator();
  handleNavbarScroll();
});