export const bellGradientSvg = (colors: string[]) => `
<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.5" d="M39.0607 18.75V20.2168C39.0607 21.9772 39.5631 23.6982 40.5046 25.163L42.8117 28.7524C44.9191 32.0309 43.3103 36.4873 39.6451 37.524C30.0568 40.2362 19.9432 40.2362 10.3549 37.524C6.68968 36.4873 5.08088 32.0309 7.18825 28.7524L9.49541 25.163C10.4369 23.6982 10.9393 21.9772 10.9393 20.2168V18.75C10.9393 10.6958 17.2345 4.16663 25 4.16663C32.7655 4.16663 39.0607 10.6958 39.0607 18.75Z" fill="url(#paint0_linear_1197_3132)"/>
<path d="M15.0903 38.6359C16.4465 42.8133 20.3706 45.8333 25 45.8333C29.6295 45.8333 33.5536 42.8133 34.9097 38.6359C28.3567 39.8656 21.6433 39.8656 15.0903 38.6359Z" fill="url(#paint1_linear_1197_3132)"/>
<defs>
<linearGradient id="paint0_linear_1197_3132" x1="25" y1="4.16663" x2="25" y2="39.5582" gradientUnits="userSpaceOnUse">
<stop stop-color="${colors[0]}"/>
<stop offset="1" stop-color="${colors[1]}"/>
</linearGradient>
<linearGradient id="paint1_linear_1197_3132" x1="25" y1="38.6359" x2="25" y2="45.8333" gradientUnits="userSpaceOnUse">
<stop stop-color="${colors[0]}"/>
<stop offset="1" stop-color="${colors[1]}"/>
</linearGradient>
</defs>
</svg>
`;
