document.addEventListener('DOMContentLoaded', () => {
    const ball = document.querySelector('.ball');
    const puppy = document.querySelector('.puppy');
    const container = document.querySelector('.animation-container');

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // ඔබේ රූපවල දෘශ්‍ය ප්‍රමාණයන් (CSS වල දී ඇති width/height)
    const ballVisualWidth = 150; /* cite: 4 */
    const ballVisualHeight = 80; /* cite: 4 */
    const puppyVisualWidth = 180; /* cite: 4 */
    const puppyVisualHeight = 180; /* cite: 4 */

    // Animation states
    const ANIMATION_STATES = {
        BALL_LEFT_TO_RIGHT: 'ballLeftToRight',
        PUPPY_FOLLOW_RIGHT: 'puppyFollowRight',
        BALL_RIGHT_TO_LEFT: 'ballRightToLeft',
        PUPPY_FOLLOW_LEFT: 'puppyFollowLeft'
    };

    let currentState = ANIMATION_STATES.BALL_LEFT_TO_RIGHT;

    // Ball and Puppy positions
    let ballX = -ballVisualWidth; // Initial position off-screen left
    let ballY = containerHeight - ballVisualHeight - 50; // Initial Y position (bottom-aligned with some offset)
    let puppyX = -puppyVisualWidth; // Initial position off-screen left
    let puppyY = containerHeight - puppyVisualHeight - 20; // Initial Y position (bottom-aligned)

    // Speeds and offsets
    const ballSpeed = 1; // pixels per frame (adjust for desired speed)
    const puppySpeed = 2; // pixels per frame (same as ball speed to maintain distance)
    const puppyOffset = 200; // Distance between ball and puppy (ball is ahead of puppy)

    // Bump animation properties
    let bumpAmplitude = 40; // Max height of the bump (adjust as needed)
    let bumpFrequency = 0.08; // How often it bumps (lower value for more frequent bumps, adjust for desired 'arc')
    let time = 0; // For sine wave calculation

    // Ball rotation and flip properties
    let ballRotation = 0; // Current rotation angle in degrees
    const rotationSpeed = 5; // Degrees to rotate per frame (adjust for desired spin speed)
    let ballScaleX = 1; // 1 for normal, -1 for flipped

    // Function to set positions
    function setPositions() {
        // Apply both rotation and scaleX to the ball
        ball.style.left = `${ballX}px`;
        ball.style.top = `${ballY}px`;
        ball.style.transform = `scaleX(${ballScaleX}) rotate(${ballRotation}deg)`;

        puppy.style.left = `${puppyX}px`;
        puppy.style.top = `${puppyY}px`;
    }

    function animateFrame() {
        time += 1; // Increment time for bump calculation

        switch (currentState) {
            case ANIMATION_STATES.BALL_LEFT_TO_RIGHT:
                ballX += ballSpeed;
                ballRotation += rotationSpeed; // Rotate clockwise
                ballScaleX = 1; // Normal direction

                // Calculate Y for bump (sine wave) - makes it go up and down
                ballY = (containerHeight - ballVisualHeight - 50) - Math.abs(Math.sin(time * bumpFrequency)) * bumpAmplitude;
                puppyX = ballX - puppyOffset; // Puppy follows the ball
                setPositions();

                // When ball and puppy move off screen right
                if (ballX > containerWidth + 150) { /* cite: 4 */
                    ballX = -ballVisualWidth; // Reset ball to off-screen left
                    puppyX = -puppyVisualWidth; // Reset puppy to off-screen left
                    // Delay before starting reverse animation
                    setTimeout(() => {
                        currentState = ANIMATION_STATES.BALL_RIGHT_TO_LEFT;
                        // Adjust initial position for right to left
                        ballX = containerWidth + ballVisualWidth; // Start ball off-screen right
                        puppyX = containerWidth + puppyVisualWidth + puppyOffset; // Start puppy off-screen right (behind ball)
                        puppy.style.transform = 'scaleX(-1)'; // Face left
                        time = 0; // Reset time for smooth bump in reverse
                    }, 1500); // 1.5 second delay before next animation phase
                }
                break;

            case ANIMATION_STATES.BALL_RIGHT_TO_LEFT:
                ballX -= ballSpeed;
                ballRotation -= rotationSpeed; // Rotate counter-clockwise
                ballScaleX = -1; // Flipped direction

                // Calculate Y for bump (sine wave)
                ballY = (containerHeight - ballVisualHeight - 50) - Math.abs(Math.sin(time * bumpFrequency)) * bumpAmplitude;
                puppyX = ballX + puppyOffset; // Puppy follows the ball (to the right of ball when moving left)
                setPositions();

                // When ball and puppy move off screen left
                if (ballX < -ballVisualWidth - 150) { /* cite: 4 */
                    ballX = containerWidth + ballVisualWidth; // Reset ball to off-screen right
                    puppyX = containerWidth + puppyVisualWidth; // Reset puppy to off-screen right
                    // Delay before starting next animation
                    setTimeout(() => {
                        currentState = ANIMATION_STATES.BALL_LEFT_TO_RIGHT;
                        // Adjust initial position for left to right
                        ballX = -ballVisualWidth; // Start ball off-screen left
                        puppyX = -puppyVisualWidth - puppyOffset; // Start puppy off-screen left (behind ball)
                        puppy.style.transform = 'scaleX(1)'; // Face right
                        time = 0; // Reset time for smooth bump
                    }, 1500); // 1.5 second delay before next animation phase
                }
                break;
        }

        requestAnimationFrame(animateFrame); // Loop to continuously update frames
    }

    // Initial setup and start animation
    setPositions(); // Set initial positions of elements
    animateFrame(); // Start the main animation loop
});