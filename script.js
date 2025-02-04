const tasks = [
    "الفجر", "الظهر", "العصر", "المغرب", "العشاء",
    "العادة السرية", "حفظ اللسان", "قراءة القرآن", "ورد التسابيح", "الصلاة على النبي"
];

const daysContainer = document.getElementById('days');
let daysData = Array(27).fill().map(() => Array(tasks.length).fill(false));

function createDay(dayIndex) {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'day';
    dayDiv.innerHTML = `<h3>اليوم ${dayIndex + 1}</h3>`;
    
    tasks.forEach((task, taskIndex) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.textContent = task;
        taskDiv.addEventListener('click', () => toggleTask(dayIndex, taskIndex, taskDiv));
        dayDiv.appendChild(taskDiv);
    });
    
    daysContainer.appendChild(dayDiv);
}

function toggleTask(dayIndex, taskIndex, taskDiv) {
    daysData[dayIndex][taskIndex] = !daysData[dayIndex][taskIndex];
    taskDiv.classList.toggle('completed', daysData[dayIndex][taskIndex]);
}

function calculateResult() {
    const totalTasks = daysData.length * tasks.length;
    let completedTasks = 0;

    daysData.forEach(day => {
        day.forEach(taskCompleted => {
            if (taskCompleted) completedTasks++;
        });
    });

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

    document.getElementById('result').textContent = `نتيجتك: ${resultText} (${completedTasks}/${totalTasks})`;
}

// إنشاء 27 يومًا
for (let i = 0; i < 27; i++) {
    createDay(i);
}