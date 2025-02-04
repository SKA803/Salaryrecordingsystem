const tasks = [
    "الفجر", "الظهر", "العصر", "المغرب", "العشاء",
    "العادة السرية", "حفظ اللسان", "قراءة القرآن", "ورد التسابيح", "الصلاة على النبي"
];

const daysContainer = document.getElementById('days');
const resultContainer = document.getElementById('result');
const statsContainer = document.createElement('div'); // إضافة قسم الإحصائيات
statsContainer.id = "stats";
document.body.appendChild(statsContainer); // إضافته أسفل الصفحة

// تحميل البيانات أو تهيئتها
let daysData = JSON.parse(localStorage.getItem('daysData')) || Array(27).fill().map(() => Array(tasks.length).fill(false));

function createDays() {
    daysContainer.innerHTML = ""; // تفريغ المحتوى عند إعادة التحميل
    for (let dayIndex = 0; dayIndex < 27; dayIndex++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        dayDiv.innerHTML = `<h3>اليوم ${dayIndex + 1}</h3>`;

        const tasksContainer = document.createElement('div');
        tasksContainer.className = 'tasks-container';
        tasksContainer.dataset.dayIndex = dayIndex; // تخزين رقم اليوم لتحديده لاحقًا عند التفاعل

        tasks.forEach((task, taskIndex) => {
            const taskDiv = document.createElement('div');
            taskDiv.className = `task ${daysData[dayIndex][taskIndex] ? 'completed' : ''}`;
            taskDiv.textContent = task;
            taskDiv.dataset.taskIndex = taskIndex; // تخزين رقم المهمة
            tasksContainer.appendChild(taskDiv);
        });

        dayDiv.appendChild(tasksContainer);
        daysContainer.appendChild(dayDiv);
    }
}

// استخدام Event Delegation لتحسين الأداء
daysContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('task')) {
        const dayIndex = e.target.parentElement.dataset.dayIndex;
        const taskIndex = e.target.dataset.taskIndex;
        
        daysData[dayIndex][taskIndex] = !daysData[dayIndex][taskIndex];
        e.target.classList.toggle('completed', daysData[dayIndex][taskIndex]);
        
        saveData();
        updateStats();
    }
});

function calculateResult() {
    const totalTasks = daysData.length * tasks.length;
    let completedTasks = daysData.flat().filter(task => task).length;

    const percentage = (completedTasks / totalTasks) * 100;
    let resultText = '';

    if (percentage >= 90) {
        resultText = 'ممتاز جدًا';
    } else if (percentage >= 75) {
        resultText = 'ممتاز';
    } else if (percentage >= 60) {
        resultText = 'جيد جدًا';
    } else if (percentage >= 50) {
        resultText = 'جيد';
    } else {
        resultText = 'سيء';
    }

    resultContainer.textContent = `نتيجتك: ${resultText} (${completedTasks}/${totalTasks})`;
}

// تحديث الإحصائيات التفصيلية
function updateStats() {
    const taskCounts = tasks.map((_, taskIndex) => {
        return daysData.reduce((count, day) => count + (day[taskIndex] ? 1 : 0), 0);
    });

    statsContainer.innerHTML = "<h2>إحصائيات الإنجاز</h2>";
    tasks.forEach((task, index) => {
        const percentage = ((taskCounts[index] / 27) * 100).toFixed(1);
        statsContainer.innerHTML += `<p>${task}: ${taskCounts[index]}/27 (${percentage}%)</p>`;
    });
}

// حفظ البيانات في localStorage
function saveData() {
    localStorage.setItem('daysData', JSON.stringify(daysData));
}

// إعادة تعيين البيانات بالكامل
function resetData() {
    if (confirm("هل أنت متأكد أنك تريد إعادة تعيين البيانات؟")) {
        daysData = Array(27).fill().map(() => Array(tasks.length).fill(false));
        saveData();
        createDays();
        updateStats();
        resultContainer.textContent = "";
    }
}

// إنشاء 27 يومًا عند تحميل الصفحة
createDays();
updateStats();

// إضافة زر إعادة التعيين
const resetButton = document.createElement('button');
resetButton.textContent = "إعادة تعيين البيانات";
resetButton.style.backgroundColor = "#dc3545";
resetButton.addEventListener('click', resetData);
document.body.appendChild(resetButton);
