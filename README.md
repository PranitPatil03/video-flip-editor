# Video Flip Editor

Video Flip Editor is a user-friendly tool designed to simplify video cropping. It integrates a video player with an overlay cropper, supporting multiple aspect ratios and providing real-time previews. This allows users to crop and edit video segments precisely and effortlessly.

## Tech Stack

- **TypeScript**
- **React.js**
- **Tailwind CSS**
- **Shadcn/ui**
- **React-router**
- **React-player**
- **React-easy-crop**
- **React-draggable**

## Features

- **Video Player Integration:** Full-featured video player with playback controls, playback rate control, and volume control.
- **Cropper Layer:** Movable and resizable cropper layer with multiple aspect ratios overlayed on the video player.
- **Dynamic Preview:** Real-time, aspect-ratio matching preview of the cropped segment displayed in a fixed-size container.
- **UI and Functionality:** Matches Figma design, records cropper data (coordinates, time, volume, playback rate), and provides a JSON download option.

## Setup and Local Run Instructions

### Prerequisites

- **Node.js** (v14 or higher)

### Project Setup

1. **Clone the Repository**
   ```sh
   git clone https://github.com/PranitPatil03/video-flip-editor.git
   cd video-flip-editor
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add the following:
   ```plaintext
   VITE_API_KEY=<your-bytescale-api>
   ```
   Get Bytescale API Key from [Bytescale Dashboard](https://www.bytescale.com/dashboard/docs).

4. **Run the Application**
   ```sh
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.

## Detailed Implementation

For a detailed explanation of the implementation, please refer to the [implementation details](https://puzzled-cornucopia-fd6.notion.site/VideoVerse-902f7f55fc3d4d509b42562683ebcfa7).

## Contact

For any queries, feel free to reach out:

- **Portfolio:** [Pranit Patil](https://patilpranit.vercel.app/)
- **Email:** [patilpranit3112@gmail.com](mailto:patilpranit3112@gmail.com)

Thank you for the opportunity to work on this assignment!
