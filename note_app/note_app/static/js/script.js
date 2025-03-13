document.addEventListener("DOMContentLoaded", function () {
    const title = document.getElementById("colorful-title");
    const text = title.innerText;
    const colors = ["#C11B17", "#33FF57", "#5733FF", "#FFC300", "#FF33A8", "#33FFF3", "#A833FF"]; // Custom colors

    title.innerHTML = ""; // Clear existing text

    text.split("").forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.classList.add("colorful-letter");
        span.style.color = colors[index % colors.length]; // Assign a color from the array
        title.appendChild(span);
    });
});
