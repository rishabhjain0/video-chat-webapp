
const loadClicks = ()=>{
    $('#createLinkButtonId').unbind('click');
    $('#createLinkButtonId').click(()=>{
        window.location.href = "http://localhost:3000/createLink";
    })

    $('#joinMeetingButtonId').unbind('click');
    $('#joinMeetingButtonId').click(()=>{
        $('#popupDivId').show();
    })

    $('#SubmitButtonEnterRoomPopupId').unbind('click');
    $('#SubmitButtonEnterRoomPopupId').click(()=>{
        const roomId = $('#roomIdFromPopup').val();
        window.location.href = `http://localhost:3000/joinMeet/${roomId}`;

    })

}
$(document).ready(function(){
    loadClicks();
  });