function Timer(duration, display) {
    this.duration = duration;
    this.display = display;
    this.timer = null;
    this.remainingTime = duration;
}

Timer.prototype.start = function() {
    if (this.timer) return;

    const startTime = Date.now();
    const updateDisplay = () => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        this.remainingTime = this.duration - elapsed;

        if (this.remainingTime <= 0) {
            this.remainingTime = 0;
            clearInterval(this.timer);
            this.timer = null;
        }

        this.display.textContent = this.formatTime(this.remainingTime);
    };

    this.timer = setInterval(updateDisplay, 1000);
    updateDisplay();
};

Timer.prototype.stop = function() {
    clearInterval(this.timer);
    this.timer = null;
};

Timer.prototype.reset = function() {
    this.stop();
    this.remainingTime = this.duration;
    this.display.textContent = this.formatTime(this.remainingTime);
};

Timer.prototype.formatTime = function(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

export default Timer;