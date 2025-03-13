$(document).ready(function () {
    const modal = $("#note-modal");

    // Open modal when clicking the "Add Note" button
    $("#add-note-btn").click(function () {
        modal.show();
    });

    // Close modal when clicking the close button (×)
    $(".close").click(function () {
        modal.hide();
    });

    // Close modal when clicking outside the modal content
    $(window).click(function (event) {
        if ($(event.target).is(modal)) {
            modal.hide();
        }
    });

    // Hide modal after clicking the Save button
    $("#save-note").click(function (event) {
        event.preventDefault(); // Prevents the form from submitting immediately
        modal.hide();
        $("form").submit(); // Submits the form after hiding the modal
    });
});
