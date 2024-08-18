document.addEventListener("DOMContentLoaded", ()=>{
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if(storedTasks){
        storedTasks.forEach((task)=>tasks.push(task)); // Fixed this line to push the actual task object
        updateTasksList();
        updateStats();
    }
});

let tasks = [];

const saveTasks = ()=>{
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const addTask = ()=>{
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if(text){
        tasks.push({text: text, completed: false});
        taskInput.value = "";
        updateTasksList();
        updateStats();
        saveTasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;

    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
    saveTasks();
};

const updateStats = () => {
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks ? (completeTasks / totalTasks) * 100 : 0; // Prevent NaN when there are no tasks
    const progressBar = document.getElementById("progress");
    progressBar.style.width = `${progress}%`;

    document.getElementById("numbers").innerText = `${completeTasks}/${totalTasks}`;

    if(tasks.length && completeTasks === totalTasks){  // Fixed this typo here
        blastConfetti();
    }
};

const updateTasksList = () => {
    const taskList = document.getElementsByClassName("task-list")[0];
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox" ${
                    task.completed ? "checked" : ""
                }/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="bin.png" onClick="deleteTask(${index})"/>
                <img src="edit.png" onClick="editTask(${index})"/>
            </div>
        </div>
        `;
        listItem.querySelector("input[type='checkbox']").addEventListener("change", () => toggleTaskComplete(index));
        taskList.append(listItem); 
    });
};

document.getElementById("newTask").addEventListener("click", function(e){
    e.preventDefault();
    addTask();
});

// const blastConfetti = () => {
//     const duration = 15 * 1000; // 15 seconds
//     const animationEnd = Date.now() + duration;
//     const defaults = { 
//         startVelocity: 30, 
//         spread: 360, 
//         ticks: 60, 
//         zIndex: 0 
//     };

//     function randomInRange(min, max) {
//         return Math.random() * (max - min) + min;
//     }

//     const interval = setInterval(function() {
//         const timeLeft = animationEnd - Date.now();

//         if (timeLeft <= 0) {
//             return clearInterval(interval);
//         }

//         const particleCount = 50 * (timeLeft / duration);

//         window.tsParticles.confetti({
//             ...defaults,
//             particleCount,
//             origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
//         });

//         window.tsParticles.confetti({
//             ...defaults,
//             particleCount,
//             origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
//         });
//     }, 250);
// };


const blastConfetti = () =>{
    const defaults = {
        spread: 360,
        ticks: 100,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["heart"],
        colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
      };
      
      confetti({
        ...defaults,
        particleCount: 50,
        scalar: 2,
      });
      
      confetti({
        ...defaults,
        particleCount: 25,
        scalar: 3,
      });
      
      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 4,
      });
}