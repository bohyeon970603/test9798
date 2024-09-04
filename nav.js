// 강아지 정보 삭제 기능
function removeDogInfo(element) {
    var container = document.getElementById('dog-info-container');
    container.removeChild(element.parentElement);
}

// 검색창 드롭다운 위치 설정
function setSearchDropdownPosition() {
    const searchInput = document.getElementById("searchInput");
    const searchDropdown = document.getElementById("searchDropdown");

    const rect = searchInput.getBoundingClientRect();
    const offsetTop = rect.bottom + window.scrollY;
    const offsetLeft = rect.left + window.scrollX;

    searchDropdown.style.top = `40px`;
    searchDropdown.style.left = `${offsetLeft}px`;
    searchDropdown.style.width = `430px`;
}

// 검색창 드롭다운 토글
function toggleSearchForm() {
    const searchDropdown = document.getElementById("searchDropdown");

    setSearchDropdownPosition();

    if (searchDropdown.style.display === "flex") {
        searchDropdown.style.display = "none";
    } else {
        searchDropdown.style.display = "flex";
    }
}

// 강아지 드롭다운 토글
function toggleDogDropdown() {
    const dogDropdown = document.getElementById("dogDropdown");
    if (dogDropdown.style.display === "block") {
        dogDropdown.style.display = "none";
    } else {
        dogDropdown.style.display = "block";
    }
}

// 메뉴 드롭다운 토글
function toggleMenuDropdown() {
    const menuDropdownContent = document.getElementById("menuDropdownContent");
    if (menuDropdownContent.style.display === "block") {
        menuDropdownContent.style.display = "none";
    } else {
        menuDropdownContent.style.display = "block";
    }
}

// 드롭다운 외부 클릭 시 닫기
document.addEventListener('click', function(event) {
    const searchDropdown = document.getElementById("searchDropdown");
    const searchInput = document.getElementById("searchInput");
    const menuDropdown = document.getElementById("menuDropdown");
    const menuDropdownContent = document.getElementById("menuDropdownContent");

    if (!searchInput.contains(event.target) && !searchDropdown.contains(event.target)) {
        searchDropdown.style.display = "none";
    }

    if (!menuDropdown.contains(event.target) && !menuDropdownContent.contains(event.target)) {
        menuDropdownContent.style.display = "none";
    }
});

// 스크롤 시 드롭다운 메뉴 위치 업데이트
document.addEventListener('scroll', function() {
    const searchDropdown = document.getElementById("searchDropdown");

    if (searchDropdown.style.display === "flex") {
        setSearchDropdownPosition();
    }
});

// 숫자 증가 및 감소 기능
function increment(id) {
    const input = document.getElementById(id);
    let currentValue = parseInt(input.value);
    if (!isNaN(currentValue) && currentValue < 10) {
        input.value = currentValue + 1;
    }
}

function decrement(id) {
    const input = document.getElementById(id);
    let currentValue = parseInt(input.value);
    if (!isNaN(currentValue) && currentValue > 0) {
        input.value = currentValue - 1;
    }
}

// Date Range Picker 설정
$(function() {
    $('#dateRangePicker').daterangepicker({
      locale: {
        format: 'YYYY-MM-DD',
        applyLabel: '적용',
        cancelLabel: '초기화',
        fromLabel: '시작일',
        toLabel: '종료일',
        customRangeLabel: '사용자 지정',
        weekLabel: 'W',
        daysOfWeek: ['일', '월', '화', '수', '목', '금', '토'],
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        firstDay: 1
      },
      minDate: moment().startOf('day'), // 오늘 날짜부터 선택 가능
      autoApply: false, // 적용 버튼이 필요하므로 자동 적용 해제
      showDropdowns: true, // 년도, 월을 선택할 수 있는 드롭다운 표시
      opens: 'center',
      autoUpdateInput: false, // 사용자가 선택할 때까지 입력 필드 업데이트 안함
      alwaysShowCalendars: true, // 항상 달력을 표시
      ranges: {
        '오늘': [moment(), moment()] // 오늘 버튼 추가
      }
    }, function(start, end, label) {
      var nights = end.diff(start, 'days');
      $('#dateRangePicker').val(start.format('MM/DD') + ' - ' + end.format('MM/DD') + ' (' + nights + '박)');
    });

    // 오늘 버튼 클릭 시 날짜는 업데이트되지만 달력은 닫히지 않음
    $('.ranges ul li').on('click', function(event) {
      var label = $(this).text();
      if (label === '오늘') {
        $('#dateRangePicker').data('daterangepicker').setStartDate(moment());
        $('#dateRangePicker').data('daterangepicker').setEndDate(moment());
        // 달력이 닫히지 않도록 적용되지 않게 함
      }
    });

    // 초기화 (Cancel) 버튼 클릭 시 input 필드 비우기, 달력 유지
    $('#dateRangePicker').on('cancel.daterangepicker', function(ev, picker) {
      $(this).val(''); // 필드 값만 초기화
      picker.show(); // 초기화 버튼 후에도 달력 유지
    });

    // 적용 버튼 클릭 시 달력 닫기
    $('#dateRangePicker').on('apply.daterangepicker', function(ev, picker) {
      var nights = picker.endDate.diff(picker.startDate, 'days');
      $(this).val(picker.startDate.format('MM/DD') + ' - ' + picker.endDate.format('MM/DD') + ' (' + nights + '박)');
    });
  });