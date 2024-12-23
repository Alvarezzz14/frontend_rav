<template>
  <div class="min-h-screen p-4 flex flex-col items-center justify-stretch">
    <!-- Sección Superior -->
    <div class="flex flex-col md:flex-row items-center justify-between p-2 rounded-lg w-full max-w-7xl mb-8">
      <div class="flex items-center mb-4 md:mb-0">
        <div class="p-6 bg-customPurple rounded-full">
          <img :src="ListaUsuarios" alt="Icono de Reportes" width="50" height="50" />
        </div>
        <div class="ml-4 text-center md:text-left">
          <p class="text-black mb-0 text-2xl md:text-3xl">Lista de</p>
          <h2 class="text-customPurple text-5xl md:text-6xl mt-0 font-bold">Usuarios</h2>
        </div>
      </div>
      <!-- Botón de Registrar Usuario -->
      <button @click="showRegisterModal = true"
        class="bg-customPurple text-white py-4 cursor-pointer hover:bg-moradoSecundario shadow-lg border-none px-6 rounded-lg flex flex-col items-center justify-center transition duration-300">
        <img :src="RegistroUsuario" alt="Registrar Usuario" class="w-16 h-16 mb-2" />
        <span class="text-center font-bold text-white">Registrar Usuario</span>
      </button>
    </div>

    <!-- Tabla de usuarios -->
    <div class="overflow-x-auto w-full max-w-7xl bg-white shadow-lg rounded-lg">
      <!-- Tabla -->
      <table class="min-w-full table-auto">
        <!-- Cabecera de la tabla -->
        <thead>
          <tr class="bg-customPurple text-white font-bold text-center">
            <th class="p-3 text-left border-b bg-gray-200 font-bold">
              <div class="flex items-center">
                <svg width="13" height="19" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.0289 18.0747C11.0565 18.5 9.31468 19 6.50004 19C3.68539 19 1.94352 18.5 0.971161 18.0747C0.324733 17.792 -0.0667896 17.0855 0.00943461 16.3431C0.136949 15.102 0.504915 13.8665 1.34585 13.3069C2.89551 12.2758 4.43375 11.8364 4.43375 11.8364C4.48795 11.6561 4.54887 11.0594 4.58076 10.4485C4.3845 10.2305 4.18999 10.003 3.98486 9.78747C3.59433 9.37709 3.5504 8.79055 3.41099 8.03396C3.15482 8.11182 3.07379 7.98143 3.00578 7.87054C2.95943 7.79472 2.9412 7.70387 2.92385 7.61518C2.86142 7.29633 2.79912 6.97747 2.73682 6.65862C2.68997 6.41912 2.64285 6.17377 2.67464 5.93142C2.68983 5.81687 2.72795 5.69678 2.81595 5.62936C2.90395 5.56208 3.05097 5.57832 3.09504 5.68405C3.09504 5.68405 2.95233 4.18334 2.95233 4.30967C2.83317 4.16819 2.73883 3.86002 2.77835 3.62185C2.81773 3.38384 2.88851 3.15217 2.92383 2.91347C2.96245 2.65135 2.9584 2.38083 3.02881 2.12629C3.12809 1.7675 3.36538 1.47342 3.60685 1.20277C3.77793 1.01105 3.95482 0.824742 4.1478 0.658626C4.53427 0.326494 4.99493 0.0765674 5.48775 0.0175269C5.64591 -0.00128907 5.80546 -0.000486511 5.96449 0.000333031C6.14291 0.00128637 6.32145 0.00222373 6.49999 0.00317707C6.67853 0.00222373 6.85707 0.00128637 7.03548 0.000333031C7.19452 -0.000486511 7.35407 -0.00128907 7.51222 0.0175269C8.00504 0.0765674 8.46572 0.326494 8.85218 0.658626C9.04515 0.824759 9.22205 1.01106 9.39313 1.20277C9.63461 1.47342 9.87191 1.7675 9.97117 2.12629C10.0416 2.38083 10.0375 2.65135 10.0761 2.91347C10.1115 3.15217 10.1823 3.38384 10.2216 3.62185C10.2611 3.86001 10.1668 4.16817 10.0476 4.30967C10.0476 4.18334 9.90494 5.68405 9.90494 5.68405C9.94901 5.57832 10.096 5.56206 10.184 5.62936C10.272 5.69678 10.3102 5.81689 10.3253 5.93142C10.3571 6.17377 10.31 6.41912 10.2632 6.65862C10.2009 6.97747 10.1386 7.29633 10.0761 7.61518C10.0588 7.70386 10.0405 7.79471 9.99419 7.87054C9.9262 7.98143 9.84516 8.11182 9.58898 8.03396C9.44957 8.79055 9.40563 9.37708 9.01512 9.78747C8.80999 10.003 8.6155 10.2305 8.41922 10.4485C8.45113 11.0594 8.51204 11.6561 8.56622 11.8364C8.56622 11.8364 10.1045 12.2758 11.6541 13.3069C12.495 13.8665 12.863 15.102 12.9905 16.3431C13.0669 17.0855 12.6753 17.792 12.0289 18.0747Z"
                    fill="white" />
                </svg>


                <span class="ml-2">NOMBRE </span>
              </div>
            </th>
            <th class="p-3 text-left border-b bg-gray-200 font-bold">
              <div class="flex items-center">
                <svg width="26" height="21" viewBox="0 0 26 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19.091 3.03318V0.28388C19.091 0.215453 18.8972 0.0468288 18.8128 0.0272782C18.6414 -0.00937919 17.9385 -0.00449159 17.7423 0.015059C17.6181 0.0272781 17.3523 0.176352 17.3523 0.281436V3.03074H16.4408V0.911943C16.3141 0.926606 16.1626 1.01703 16.0558 1.08301C15.3082 1.53756 14.7171 2.42467 14.5557 3.27268C14.5159 3.4804 14.5234 4.04737 14.4116 4.14757C14.3694 4.18667 14.2924 4.19644 14.2502 4.2331C14.049 4.40906 13.9198 4.55324 13.8528 4.81962C13.8279 4.92226 13.7708 5.1642 13.8528 5.22774H22.6526C22.6178 4.72675 22.4514 4.35285 21.9969 4.09869C21.9472 3.71745 21.9298 3.33866 21.8206 2.9672C21.5548 2.05076 20.8693 1.27607 20 0.86551V3.02585H19.0885L19.091 3.03318ZM21.7411 6.08796H14.7022C14.6873 8.61243 17.3225 10.2938 19.6846 9.26005C20.909 8.72485 21.7982 7.42474 21.7411 6.08796Z"
                    fill="white" />
                  <path
                    d="M25.3006 14.6019V16.5179H11.1409V14.7241C11.3644 12.2461 15.6141 11.3883 17.6184 11.3003C19.7296 11.2075 24.9926 11.9162 25.3006 14.6019Z"
                    fill="white" />
                  <path
                    d="M19.0914 3.03282H20.0029V0.872478C20.8722 1.2806 21.5552 2.05773 21.8235 2.97417C21.9303 3.34563 21.9501 3.72442 21.9998 4.10566C22.4543 4.35737 22.6183 4.73128 22.6555 5.23471H13.8532C13.7688 5.17117 13.8259 4.92678 13.8532 4.82659C13.9203 4.56021 14.0494 4.41602 14.2506 4.24007C14.2928 4.20341 14.3698 4.19119 14.412 4.15453C14.5238 4.05434 14.5164 3.48737 14.5561 3.27965C14.7175 2.42919 15.3087 1.54453 16.0563 1.08998C16.1631 1.024 16.3171 0.933574 16.4412 0.918911V3.03771H17.3528V0.288404C17.3528 0.180876 17.6185 0.034246 17.7427 0.0220269C17.9389 0.00247626 18.6418 -0.00485517 18.8132 0.034246C18.8977 0.0537966 19.0914 0.219977 19.0914 0.290848V3.04015V3.03282Z"
                    fill="white" />
                  <path
                    d="M21.7422 6.08789C21.7994 7.42466 20.9102 8.72478 19.6857 9.25998C17.3212 10.2937 14.6885 8.61236 14.7034 6.08789H21.7422Z"
                    fill="white" />
                  <path
                    d="M0.656965 20.816C0.403337 20.726 0.184884 20.5702 0.142304 20.2813C0.186735 18.8928 -0.127985 17.6225 0.890229 16.5136C1.52522 15.8213 2.36016 15.5999 3.24693 15.4216L4.60393 16.5549C4.58172 16.6337 4.53358 16.6975 4.50952 16.7782C4.47064 16.9058 4.35401 17.3617 4.35956 17.4724C4.36882 17.6526 4.52433 17.8121 4.70205 17.8102L4.21331 20.8179H0.656965V20.816Z"
                    fill="white" />
                  <path
                    d="M9.51154 20.816H5.97926L5.4646 17.8083C5.8182 17.752 5.8256 17.5381 5.77006 17.236C5.72748 17.0109 5.66269 16.7594 5.56272 16.5549L6.92157 15.4216C7.84167 15.6111 8.69326 15.8419 9.32641 16.5887C10.265 17.6938 9.95215 18.936 10.0003 20.2813C9.96881 20.5627 9.75961 20.7279 9.50969 20.816H9.51154Z"
                    fill="white" />
                  <path
                    d="M5.21302 8.08909C5.92948 8.04031 6.44969 8.34427 6.92362 8.85276C6.98286 8.91655 7.05692 9.0554 7.11801 9.1023C7.21428 9.1736 7.37719 9.21864 7.49753 9.31433C8.0307 9.74025 8.18066 10.3913 8.13808 11.0537C8.12882 11.2057 8.02515 11.5734 8.03811 11.6729C8.04551 11.7329 8.14363 11.7948 8.18251 11.853C8.44909 12.2545 8.31765 13.1458 7.91037 13.4347C7.82521 13.4948 7.64933 13.5417 7.61046 13.5792C7.57528 13.613 7.43643 13.9638 7.39015 14.052C6.27382 16.1103 4.1837 16.3111 2.92852 14.249C2.84706 14.1158 2.66193 13.6655 2.6064 13.6055C2.56011 13.5567 2.34536 13.5079 2.2528 13.4403C1.76035 13.0857 1.65298 11.8999 2.27131 11.5978C2.29538 10.8492 2.43052 10.0705 2.88964 9.46443C3.40431 8.78333 4.35587 8.14914 5.21488 8.09097L5.21302 8.08909ZM2.81559 11.3895C2.81004 11.7141 2.78042 12.0181 2.8193 12.3446C2.93408 13.3203 3.56167 14.6205 4.49287 15.0258C6.02019 15.6919 7.20132 13.7424 7.37534 12.444C7.43088 12.035 7.41051 11.8642 7.27352 11.4833C7.08839 10.9636 6.79033 10.487 6.42007 10.0817L6.3886 10.0742C6.21458 10.1943 6.08313 10.3613 5.91652 10.4927C5.0427 11.1869 3.91156 11.4402 2.81374 11.3877L2.81559 11.3895Z"
                    fill="white" />
                </svg>


                <span class="ml-2">ROL </span>
              </div>
            </th>
            <th class="p-3 text-left border-b bg-gray-200 font-bold">
              <div class="flex items-center">
                <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.8057 0.0125833L15.0921 0C16.1003 0.0754996 16.9088 0.863527 17 1.86862V10.6549C16.9009 11.5216 16.2765 12.2168 15.4381 12.4338C10.9364 12.5581 6.41432 12.4496 1.90479 12.4889C0.918579 12.4103 0.13527 11.6694 0 10.6895V1.79941C0.130551 0.858809 0.863527 0.125833 1.80885 0.0125833H1.8057ZM14.455 1.56347H3.08447L8.58808 5.76157L14.455 1.56347ZM15.435 2.86899L8.55033 7.72298L1.55875 2.47104V10.5118C1.55875 10.7257 1.90637 10.9585 2.12028 10.9301H14.8372C15.0606 10.9695 15.435 10.7398 15.435 10.5118V2.86899Z"
                    fill="white" />
                </svg>
                <span class="ml-2">CORREO </span>
              </div>
            </th>
            <th class="p-3 text-left border-b bg-gray-200 font-bold">
              <div class="flex items-center">
                <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0 1.21429C0 0.543655 0.543654 0 1.21429 0H15.7857C16.4563 0 17 0.543654 17 1.21429V10.9286C17 11.5992 16.4563 12.1429 15.7857 12.1429H1.21429C0.543655 12.1429 0 11.5992 0 10.9286V1.21429Z"
                    fill="white" />
                  <rect x="9.71423" y="3.03564" width="4.49286" height="0.728571" fill="#71277A" />
                  <rect x="9.71423" y="4.85718" width="4.49286" height="0.728571" fill="#71277A" />
                  <rect x="9.71423" y="6.67847" width="4.49286" height="0.728571" fill="#71277A" />
                  <rect x="9.71423" y="8.5" width="4.49286" height="0.728571" fill="#71277A" />
                  <path
                    d="M8.49999 6.0108C8.49999 6.18011 8.48525 6.34596 8.45698 6.50715C8.22207 7.84653 7.05309 8.86437 5.64642 8.86437C5.60321 8.86437 5.56023 8.86342 5.5175 8.86152C4.00133 8.79408 2.79285 7.54357 2.79285 6.0108C2.79285 4.43481 4.07043 3.15723 5.64642 3.15723C7.2224 3.15723 8.49999 4.43481 8.49999 6.0108Z"
                    fill="#71277A" />
                  <path
                    d="M6.84714 7.75224C6.63596 7.83861 6.25767 7.94017 5.6464 7.94017C5.03512 7.94017 4.65683 7.83861 4.44565 7.75224C4.30527 7.69481 4.22024 7.55132 4.23679 7.40054C4.26448 7.14844 4.3444 6.8975 4.52703 6.78384C4.86358 6.5744 5.19765 6.48516 5.19765 6.48516C5.20942 6.44853 5.22265 6.32734 5.22958 6.20326C5.18695 6.15898 5.14471 6.11278 5.10016 6.069C5.01535 5.98565 5.0058 5.86652 4.97553 5.71285C4.91989 5.72866 4.9023 5.70218 4.88753 5.67965C4.87746 5.66425 4.8735 5.6458 4.86973 5.62779C4.85617 5.56302 4.84264 5.49826 4.82911 5.4335C4.81894 5.38485 4.80871 5.33502 4.81561 5.28579C4.81891 5.26253 4.82719 5.23814 4.8463 5.22444C4.86541 5.21078 4.89734 5.21408 4.90691 5.23555C4.90691 5.23555 4.87592 4.93074 4.87592 4.9564C4.85004 4.92766 4.82955 4.86507 4.83813 4.81669C4.84669 4.76835 4.86206 4.7213 4.86973 4.67281C4.87812 4.61957 4.87724 4.56463 4.89253 4.51293C4.91409 4.44005 4.96562 4.38032 5.01806 4.32535C5.05522 4.28641 5.09364 4.24857 5.13555 4.21483C5.21948 4.14737 5.31952 4.09661 5.42655 4.08461C5.4609 4.08079 5.49555 4.08096 5.53009 4.08112C5.56884 4.08132 5.60761 4.08151 5.64639 4.0817C5.68516 4.08151 5.72394 4.08132 5.76268 4.08112C5.79722 4.08096 5.83187 4.08079 5.86622 4.08461C5.97325 4.09661 6.0733 4.14737 6.15723 4.21483C6.19914 4.24857 6.23756 4.28641 6.27471 4.32535C6.32715 4.38032 6.37869 4.44005 6.40025 4.51293C6.41554 4.56463 6.41466 4.61957 6.42304 4.67281C6.43072 4.7213 6.44609 4.76835 6.45464 4.81669C6.46322 4.86507 6.44273 4.92766 6.41685 4.9564C6.41685 4.93074 6.38586 5.23555 6.38586 5.23555C6.39543 5.21408 6.42736 5.21077 6.44647 5.22444C6.46559 5.23814 6.47387 5.26253 6.47716 5.28579C6.48407 5.33502 6.47384 5.38485 6.46366 5.4335C6.45013 5.49826 6.4366 5.56302 6.42304 5.62779C6.41927 5.6458 6.41531 5.66425 6.40525 5.67965C6.39048 5.70218 6.37288 5.72866 6.31724 5.71285C6.28697 5.86652 6.27742 5.98565 6.19261 6.069C6.14806 6.11278 6.10583 6.15898 6.0632 6.20326C6.07013 6.32734 6.08336 6.44853 6.09512 6.48516C6.09512 6.48516 6.4292 6.5744 6.76574 6.78384C6.94837 6.8975 7.02829 7.14844 7.05598 7.40054C7.07256 7.55132 6.98753 7.69482 6.84714 7.75224Z"
                    fill="white" />
                </svg>

                <span class="ml-2">DOCUMENTO </span>
              </div>
            </th>

            <th class="p-3 text-left border-b bg-gray-200 font-bold">
              <div class="flex items-center">
                <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.22761 16.9027L5.95495 16.409L4.63429 17.3293C4.31381 17.5027 3.94842 17.4355 3.66664 17.2168C3.32602 16.9527 2.17567 15.795 1.92176 15.4528C1.31175 14.631 2.35372 13.8888 2.71911 13.2201C2.74388 13.181 2.73924 13.1435 2.73304 13.1013C2.71601 12.9982 2.48377 12.5826 2.42339 12.4342C2.35063 12.2561 2.29334 12.067 2.24689 11.8811C2.18496 11.817 0.831793 11.6702 0.590266 11.5842C0.282164 11.4764 0.0530233 11.128 0.0236066 10.8061C-0.0491611 10.003 0.0731506 9.07965 0.0344444 8.26406C0.248103 7.32505 1.3582 7.53754 2.07659 7.32505C2.34288 7.24536 2.31966 6.98131 2.42339 6.73757C2.52713 6.49383 2.65873 6.26103 2.73924 6.00792C2.39707 5.29389 1.27924 4.54861 1.94034 3.69865C2.18961 3.37835 3.40034 2.13622 3.70844 1.92061C4.55378 1.32532 5.21489 2.40652 5.87754 2.72838C5.92553 2.75182 5.96269 2.77838 6.01998 2.75651L7.21677 2.23622C7.49391 1.50657 7.22142 0.122256 8.29435 0.0238228C9.09015 -0.0496113 10.0052 0.0738204 10.8134 0.0347597C11.8213 0.283186 11.4807 1.51907 11.8089 2.25497L13.049 2.76276C13.7721 2.40809 14.4997 1.26908 15.3559 1.97373C15.7198 2.27372 16.8407 3.37835 17.0977 3.74084C17.6721 4.54705 16.6425 5.29858 16.2833 5.95167L16.2694 6.07042L16.8051 7.29536C17.5297 7.54066 18.8859 7.30005 18.9773 8.36562C19.0469 9.1734 18.9308 10.089 18.9664 10.9077C18.7435 11.8545 17.5978 11.6373 16.8856 11.8451C16.6905 11.9014 16.6564 12.2529 16.579 12.4357C16.4753 12.6795 16.3437 12.9123 16.2632 13.1654C16.6069 13.8904 17.7201 14.6138 17.0636 15.4747C16.8655 15.734 15.455 17.159 15.2243 17.2933C14.3914 17.7761 13.7829 16.7637 13.1264 16.4449C13.0692 16.4168 13.0552 16.4043 12.984 16.4168C12.8849 16.434 12.4653 16.6684 12.3229 16.7293C12.1975 16.784 11.8244 16.8699 11.7702 16.959C11.5333 17.6699 11.7531 19.0339 10.7452 19.1495C10.2033 19.212 8.80063 19.2089 8.25565 19.1495C7.24309 19.0386 7.45675 17.623 7.22761 16.9059V16.9027ZM13.529 5.85636C11.027 3.09243 6.55412 3.60178 4.73803 6.85944C2.33669 11.1655 6.28473 16.2121 10.9945 14.8981C14.9054 13.8076 16.2694 8.88279 13.529 5.85636Z"
                    fill="white" />
                  <path
                    d="M7.709 10.0831C9.55296 10.2456 11.9853 9.40661 13.1201 11.3503C13.213 11.5096 13.436 11.9721 13.3864 12.1362C13.3617 12.2159 12.9823 12.683 12.9003 12.7736C11.0795 14.7517 7.91956 14.7517 6.09882 12.7736C6.00438 12.6721 5.60493 12.1768 5.59874 12.0768C5.591 11.9581 5.78453 11.5206 5.8511 11.3971C6.22733 10.7081 6.94262 10.2222 7.70745 10.0831H7.709Z"
                    fill="white" />
                  <path
                    d="M9.15635 5.09322C12.29 4.6948 12.674 9.35864 9.7741 9.65394C6.71785 9.96487 6.36021 5.44789 9.15635 5.09322Z"
                    fill="white" />
                </svg>

                <span class="ml-2">PERMISOS </span>
              </div>
            </th>
          </tr>
        </thead>
        <!-- Cuerpo de la tabla -->
        <tbody>
          <tr v-for="(user, index) in users" :key="index" class="text-center border-t border-gray-200">
            <td class="p-4 border-b border-gray-300">{{ user.nombre }}</td>
            <td class="p-4 border-b border-gray-300">{{ user.rol }}</td>
            <td class="p-4 border-b border-gray-300">{{ user.correo }}</td>
            <td class="p-4 border-b border-gray-300">{{ user.numero_documento }}</td>
            <td class="p-4 border-b border-gray-300 flex justify-center items-center">
              <!-- Botón Ver -->
              <button @click="viewUser(user)" class="bg-white cursor-pointer border-none shadow-md p-2 rounded-full">
                <img :src="IconoVisualizar" alt="Ver" class="w-5 h-5" />
              </button>
              <!-- Botón Editar -->
              <button @click="editUser(user)"
                class="bg-white cursor-pointer mx-2 border-none shadow-md p-2 rounded-full">
                <img :src="IconoEditar" alt="Editar" class="w-5 h-5" />
              </button>
              <!-- Botón Eliminar -->
              <button @click="confirmDeleteUser(user)"
                class="bg-white border-none cursor-pointer shadow-md p-2 rounded-full">
                <img :src="IconoEliminar" alt="Eliminar" class="w-5 h-5" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para Registrar Usuario -->

    <div v-if="showRegisterModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">

      <!-- Modal -->
      <div class="relative bg-white shadow-lg rounded-lg w-full max-w-5xl flex flex-col lg:flex-row overflow-hidden">

        <!-- Botón de Cerrar -->
        <button @click="closeRegisterModal"
          class="absolute top-4 right-4 text-customPurple  rounded-full hover:text-customPurple hover:bg-white cursor-pointer border-none text-xl z-10">
          ✕
        </button>

        <!-- Formulario -->
        <div class="relative z-10 bg-white p-8 lg:p-16 w-full lg:w-1/2 mx-auto rounded-lg lg:rounded-none">

          <!-- Logo de RAV -->
          <div class="text-center mb-4">
            <img :src="logoRav" alt="Logo RAV" class="w-36 h-auto mx-auto mb-4 lg:w-48" />
          </div>

          <!-- Título del Formulario -->
          <h2 class="text-2xl lg:text-3xl font-semibold text-black mb-6 text-center">Registrar Usuario</h2>

          <!-- Selección de Rols -->
          <div class="flex justify-between mb-6">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" id="admin" name="rol" value="Administrador" v-model="formData.rol"
                class="form-radio h-5 w-5 text-customPurple focus:ring-customPurple" />
              <span
                :class="{ 'text-black font-semibold': formData.rol === 'Administrador', 'text-gray-700': formData.rol !== 'Administrador' }"
                class="text-sm lg:text-lg">
                Administrador
              </span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" id="funcionario" name="rol" value="Funcionario" v-model="formData.rol"
                class="form-radio h-5 w-5 text-customPurple focus:ring-customPurple" />
              <span
                :class="{ 'text-black font-semibold': formData.rol === 'Funcionario', 'text-gray-700': formData.rol !== 'Funcionario' }"
                class="text-sm lg:text-lg">
                Funcionario
              </span>
            </label>
            
          </div>

          <!-- Campos del Formulario -->
          <form @submit.prevent="submitForm" class="space-y-4">
            <input v-model="formData.nombre" type="text" placeholder="Nombre"
              class="w-full px-4 py-3 bg-gray-100 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-customPurple"
              required />
            <input v-model="formData.correo" type="email" placeholder="Correo SENA"
              class="w-full px-4 py-3 bg-gray-100 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-customPurple"
              required />
            <input v-model="formData.password" type="password" placeholder="Crear Contraseña" id="password"
              class="w-full px-4 py-3 bg-gray-100 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-customPurple"
              required />
            <input v-model="formData.confirmPassword" type="password" placeholder="Confirmar Contraseña"
              id="confirmPassword"
              class="w-full px-4 py-3 bg-gray-100 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-customPurple"
              required />
            <button type="submit"
              class="w-full bg-customPurple cursor-pointer hover:bg-moradoSecundario text-amarillo font-bold py-3 rounded-lg transition duration-300 "  @click="handleRegister">
              Registrar
            </button>
          </form>

          <!-- Logos Inferiores -->
          <div class="flex justify-center items-center space-x-6 mt-6">
            <img :src="logoSena" alt="Logo SENA" class="w-12 h-auto" />
            <img :src="logoApe" alt="Logo APE" class="w-12 h-auto" />
          </div>
        </div>

        <!-- Imagen de Fondo -->
        <div class="relative hidden lg:block w-1/2 overflow-hidden z-0">
          <img :src="imagenRegistro" alt="Cultura Colombiana" class="w-full h-full object-cover lg:rounded-r-lg" />
        </div>


      </div>
      <confirmacion-registro v-if="showConfirmation" @close="closeConfirmationModal" />
    </div>


    <!-- Modal para Ver Usuario -->
    <div v-if="showViewModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
      <!-- Modal Content -->
      <div class="bg-white shadow-lg rounded-lg w-10/12 max-w-xl p-6 relative bg-no-repeat bg-cover bg-center "
        :style="{ backgroundImage: `url(${FondoImagen})`, backgroundSize: '80%', backgroundPosition: 'center' }">



        <!-- Contenedor para el título, imagen y botón de cerrar -->
        <div class="flex items-center justify-between mb-4">
          <!-- Título y Imagen de Usuario -->
          <div class="flex items-center">
            <!-- Imagen de Usuario -->
            <div class="bg-customPurple rounded-full p-2 mr-2">
              <img :src="Usuario" alt="Usuario" class="w-8 h-8" />
            </div>
            <!-- Título -->
            <h2 class="text-xl font-bold text-black">Datos del Usuario</h2>
          </div>

          <!-- Close Button -->
          <button @click="closeViewModal"
            class="text-customPurple hover:text-white cursor-pointer hover:bg-customPurple rounded-full border-none text-2xl">
            ✕
          </button>
        </div>

        <!-- Datos Personales (con valores debajo de cada campo) -->
        <div class="mb-6">
          <h3 class="font-semibold text-black">Datos Personales</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Nombre de Usuario -->
            <div class="flex flex-col">
              <span class="font-medium">Nombre de Usuario:</span>
              <span class="text-black bg-gray-100/50 w-64 rounded-lg p-2">{{ selectedUser.nombre }}</span>
            </div>
            <!-- Cédula -->
            <div class="flex flex-col">
              <span class="font-medium">Cédula:</span>
              <span class="text-black bg-gray-100/50 w-64 rounded-lg p-2">{{ selectedUser.numero_documento }}</span>
            </div>
            <!-- Nombres -->
            <div class="flex flex-col">
              <span class="font-medium">Nombres:</span>
              <span class="text-black bg-gray-100/50 w-64 rounded-lg p-2">{{ selectedUser.nombre }}</span>
            </div>
            <!-- Apellidos -->
            <div class="flex flex-col">
              <span class="font-medium">Apellidos:</span>
              <span class="text-black bg-gray-100/50 w-64 rounded-lg p-2">{{ selectedUser.apellido }}</span>
            </div>
            <!-- Correo -->
            <div class="flex flex-col sm:col-span-2">
              <span class="font-medium">Correo:</span>
              <span class="text-black bg-gray-100/50 w-64 rounded-lg p-2">{{ selectedUser.correo }}</span>
            </div>
          </div>
        </div>

        <!-- Datos Laborales (con valores debajo de cada campo) -->
        <div>
          <h3 class="font-semibold text-black">Datos Laborales</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Ubicación / Sede -->
            <div class="flex flex-col">
              <span class="font-medium">Ubicación / Sede:</span>
              <span class="text-black bg-gray-100/50 rounded-lg w-64 p-2">{{ selectedUser.sed_nombre }}</span>
            </div>
            <!-- Regional -->
            <div class="flex flex-col">
              <span class="font-medium">Regional:</span>
              <span class="text-black bg-gray-100/50 rounded-lg w-64 p-2">{{ selectedUser.regional }}</span>
            </div>
            <!-- Rol -->
            <div class="flex flex-col">
              <span class="font-medium">Rol:</span>
              <span class="text-black bg-gray-100/50 rounded-lg w-64 p-2">{{ selectedUser.rol }}</span>
            </div>
            <!-- Teléfonos -->
            <div class="flex flex-col sm:col-span-2">
              <span class="font-medium">Teléfono:</span>
              <span class="text-black bg-gray-100/50 rounded-lg p-2 w-64">{{ selectedUser.telefono }}</span>
            </div>
            <!-- Celular -->
            <div class="flex flex-col">
              <span class="font-medium">Celular:</span>
              <span class="text-black bg-gray-100/50 rounded-lg w-64 p-2">{{ selectedUser.celular }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- Modal para Editar Usuario -->
    <div v-if="showEditModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
      <div class="bg-white shadow-lg rounded-lg w-10/12 max-w-4xl p-6 relative bg-no-repeat bg-cover bg-center "
        :style="{ backgroundImage: `url(${FondoImagen})`, backgroundSize: '50%', backgroundPosition: 'center' }">
        <div>
          <div class="flex items-center">
            <!-- Imagen de Usuario -->
            <div class="bg-customPurple rounded-full p-2 mr-2">
              <img :src="Usuario" alt="Usuario" class="w-8 h-8" />
            </div>
            <!-- Título -->
            <h2 class="text-xl font-bold text-black">DATOS DE USUARIO</h2>
          </div>
          <button @click="closeEditModal"
            class="absolute top-4 right-4 text-customPurple cursor-pointer font-bold hover:text-white hover:bg-customPurple border-none rounded-full p-2">
            ✕
          </button>

        </div>

        <div>

          <form @submit.prevent="saveUser" class="space-y-3">
            <h3 class="font-semibold text-black  text-sm">DATOS BASE</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex flex-col">
                <label for="Nombre" class="font-medium">Nombre Completo:</label>
                <input v-model="selectedUser.nombre" type="text"
                  class="w-full px-3 h-11 py-2 bg-gray-100/50 border-none rounded-lg" required />
              </div>
              <!--cedula-->
              <div class="flex flex-col">
                <label for="Nombre" class="font-medium">Cedula:</label>
                <input v-model="selectedUser.numero_documento" type="cedula"
                  class="w-full px-3 h-11 py-2 bg-gray-100/50 border-none rounded-lg" required />
              </div>
            </div>

            <h3 class="font-semibold text-black  text-sm">DATOS LABORALES</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!--Ubicación / Sede-->
              <div class="flex flex-col">
                <label for="sed_nombre" class="font-medium">Ubicación / Sede:</label>
                <input v-model="selectedUser.sed_nombre" type="text"
                  class="w-full px-3 h-11 py-2 bg-gray-100/50 border-none rounded-lg" required />
              </div>
              <!--regional-->
              <div class="flex flex-col">
                <label for="regional" class="font-medium">Regional:</label>
                <input v-model="selectedUser.regional" type="text"
                  class="w-full px-3 h-11 py-2 bg-gray-100/50 border-none rounded-lg" required />
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!--rol-->
              <div class="flex flex-col">
                <label for="rol" class="font-medium">Rol:</label>
                <select v-model="selectedUser.rol" id="rol"
                  class="w-full bg-gray-100/50 border-none px-3 h-11 bg-gray-100  rounded-lg" required>
                  <option value="Administrador">Administrador</option>
                  <option value="Funcionario">Funcionario</option>
                  <option value="Operario">Operario</option>
                </select>
              </div>


              <!--email-->
              <div class="flex flex-col">
                <label for="Correo" class="font-medium">Correo:</label>
                <input v-model="selectedUser.correo" type="email"
                  class="w-full px-3 h-11 py-2 bg-gray-100/50 border-none rounded-lg" required />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!--telefono-->
              <div class="flex flex-col">
                <label for="Telefono" class="font-medium">Telefono:</label>
                <input v-model="selectedUser.telefono" type="telefono"
                  class="w-full px-3 h-11 py-2 bg-gray-100/50 border-none rounded-lg" required />
              </div>
              <!--celular-->
              <div class="flex flex-col">
                <label for="Celular" class="font-medium">Celular:</label>
                <input v-model="selectedUser.celular" type="celular"
                  class="w-full px-3 h-11 py-2 bg-gray-100/50 border-none rounded-lg" required />
              </div>
            </div>

            <!--permisos de usuario-->
            <h3 class="font-semibold text-black  text-sm ">PERMISOS DE USUARIO</h3>
            <div class="flex flex-row">
              <input type="checkbox" id="inicio" name="inicio" v-model="permisos.inicio">
              <svg class="mx-1 bg-customPurple w-9 h-7 rounded-full p-1" width="14" height="15" viewBox="0 0 14 15"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0.314453C3.15 0.314453 0 3.43139 0 7.24099C0 11.0506 3.15 14.1675 7 14.1675C10.85 14.1675 14 11.0506 14 7.24099C14 3.43139 10.85 0.314453 7 0.314453ZM7 2.04609C9.905 2.04609 12.25 4.36648 12.25 7.24099C12.25 10.1155 9.905 12.4359 7 12.4359C4.095 12.4359 1.75 10.1155 1.75 7.24099C1.75 4.36648 4.095 2.04609 7 2.04609ZM7 3.77772C6.51 3.77772 6.125 4.15868 6.125 4.64354C6.125 5.1284 6.51 5.50936 7 5.50936C7.49 5.50936 7.875 5.1284 7.875 4.64354C7.875 4.15868 7.49 3.77772 7 3.77772ZM4.095 5.50936C3.9501 5.55539 3.81985 5.63802 3.71709 5.74909C3.61433 5.86017 3.54263 5.99583 3.50906 6.14271C3.47548 6.28958 3.4812 6.44258 3.52565 6.5866C3.57009 6.73061 3.65173 6.86067 3.7625 6.96393L5.355 8.53972C5.32 8.67825 5.25 8.81678 5.25 8.97262C5.25 9.92502 6.0375 10.7043 7 10.7043C7.9625 10.7043 8.75 9.92502 8.75 8.97262C8.75 8.02023 7.9625 7.24099 7 7.24099C6.8425 7.24099 6.7025 7.31026 6.5625 7.34489L4.97 5.7691C4.87425 5.66425 4.75402 5.58418 4.6198 5.53588C4.48558 5.48759 4.34145 5.47253 4.2 5.49204C4.16503 5.48996 4.12997 5.48996 4.095 5.49204V5.50936ZM9.625 5.50936C9.135 5.50936 8.75 5.89032 8.75 6.37517C8.75 6.86003 9.135 7.24099 9.625 7.24099C10.115 7.24099 10.5 6.86003 10.5 6.37517C10.5 5.89032 10.115 5.50936 9.625 5.50936Z"
                  fill="white" />
              </svg>
              <label for="inicio">Inicio</label>

              <input type="checkbox" v-model="permisos.mapa" id="mapa" name="mapa" value="Bike">
              <svg class="mx-1 bg-customPurple w-9 h-7 rounded-full p-1" width="14" height="15" viewBox="0 0 14 15"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.7054 6.9634L12.3593 6.17551C12.9797 6.04795 12.9768 6.74392 13.0657 7.16882C13.408 8.81401 13.7106 10.478 14 12.1297C13.9962 12.2826 13.8827 12.3745 13.773 12.4636L9.59054 14.2317L9.28794 14.2139L4.54563 12.5584L0.564539 14.228C0.270449 14.2833 0.0775414 14.1726 0 13.8894C0.293144 11.9881 0.72435 10.0962 1.07612 8.20058C1.11584 8.08709 1.20756 7.99423 1.3078 7.92951L3.31726 6.9634C3.10165 6.53756 2.93428 6.06858 2.87565 5.59115C2.59291 3.2875 4.38298 1.13768 6.71584 0.988545C9.93002 0.78313 12.1759 4.11292 10.7073 6.9634H10.7054ZM6.96359 3.54545C5.26147 3.54545 5.35603 5.13999 5.82884 6.45315L7.05816 6.64074L8.09834 6.35935C8.47659 5.42138 9.14704 3.54545 6.96359 3.54545ZM11.7863 7.67251L9.77589 8.38067L9.28794 9.01661L9.70591 12.8313L9.9896 12.7375L12.5428 11.7058L11.7863 7.67251ZM1.28983 13.0189L3.93759 11.7996L4.31584 8.42288L3.7617 7.71284L1.87707 8.64236L1.28983 13.0189ZM8.77636 9.73041L7.39669 11.5557C7.22269 11.7977 6.91348 11.8408 6.68747 11.6401L5.26147 9.6413L5.1669 11.611L9.13853 12.9242L8.77636 9.72947V9.73041Z"
                  fill="white" />
                <path
                  d="M6.8123 3.28939C8.13996 3.15526 9.16597 4.38025 8.77732 5.65119C8.39434 6.90432 6.81892 7.35548 5.81183 6.50193C4.60143 5.47579 5.22649 3.45072 6.81136 3.29033L6.8123 3.28939ZM7.01089 3.85686C5.32767 3.86999 5.38535 6.39312 7.04115 6.37437C8.69694 6.35561 8.67613 3.84373 7.01089 3.85686Z"
                  fill="white" />
              </svg>
              <label for="mapa">Mapa</label>

              <input type="checkbox" v-model="permisos.busqueda" id="busqueda" name="busqueda">
              <svg class="mx-1 bg-customPurple w-9 h-7 rounded-full p-1" width="12" height="13" viewBox="0 0 12 13"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.99583 0.607928C7.37491 0.407182 9.63438 4.10712 7.88405 7.00407C7.78188 7.1729 7.50325 7.47444 7.44583 7.60547C7.4357 7.62899 7.42219 7.64747 7.43401 7.67434L8.27667 8.51428C8.60934 8.32026 8.93948 8.31018 9.25104 8.54872C9.99238 9.41302 11.0909 10.2042 11.7934 11.0753C12.4494 11.8892 11.4041 12.9248 10.5986 12.2638C9.71459 11.5389 8.9209 10.4764 8.04278 9.72044C7.84521 9.44746 7.82748 9.08796 8.00732 8.80154L7.13933 7.90953C5.04873 9.90523 1.54638 9.20135 0.362612 6.5799C-0.821162 3.95845 1.02458 0.784316 3.99583 0.607928ZM4.02623 1.46131C1.43409 1.6293 -0.0570284 4.56405 1.41804 6.71765C2.89312 8.87126 5.92516 8.68227 7.17986 6.51691C8.52575 4.19531 6.70281 1.28828 4.02623 1.46131Z"
                  fill="white" />
                <path
                  d="M4.1088 2.20786C6.12839 2.08552 6.51769 4.99113 4.53342 5.37492C2.26333 5.81388 1.81654 2.34618 4.1088 2.20786Z"
                  fill="white" />
                <path
                  d="M5.49442 5.09277C5.87483 5.25713 6.22438 5.6479 6.38622 6.05091C6.47799 6.27995 6.55223 6.41021 6.39623 6.61128C5.46021 7.82119 3.68328 7.99341 2.49949 7.08073C2.3877 6.99506 1.9906 6.63138 1.95139 6.51686C1.90384 6.37786 2.19416 5.85596 2.28509 5.72658C2.38019 5.5902 2.76227 5.17582 2.90159 5.13386C2.98418 5.10938 3.21026 5.32794 3.30537 5.38039C4.0128 5.77553 4.90878 5.66363 5.49525 5.09277H5.49442Z"
                  fill="white" />
              </svg>
              <label for="busqueda">Busqueda del Ciudadano</label>

              <input type="checkbox" v-model="permisos.cargarArchivo" id="cargarArchivo" name="cargarArchivo">
              <svg class="mx-1 bg-customPurple w-9 h-7 rounded-full p-1" width="14" height="11" viewBox="0 0 14 11"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.33334 5.5979C9.33334 5.53077 9.31146 5.47563 9.26771 5.43247L6.70104 2.9007C6.65729 2.85755 6.60139 2.83597 6.53334 2.83597C6.46528 2.83597 6.40937 2.85755 6.36562 2.9007L3.80625 5.42528C3.75764 5.48282 3.73334 5.54036 3.73334 5.5979C3.73334 5.66503 3.75521 5.72018 3.79896 5.76333C3.84271 5.80649 3.89861 5.82807 3.96666 5.82807H5.6V8.35983C5.6 8.42217 5.62309 8.47611 5.66927 8.52167C5.71545 8.56722 5.77014 8.59 5.83334 8.59H7.23334C7.29653 8.59 7.35122 8.56722 7.3974 8.52167C7.44358 8.47611 7.46666 8.42217 7.46666 8.35983V5.82807H9.1C9.16319 5.82807 9.21788 5.80529 9.26406 5.75973C9.31025 5.71418 9.33334 5.66023 9.33334 5.5979ZM14 7.66935C14 8.43176 13.7266 9.08268 13.1797 9.62212C12.6328 10.1616 11.9729 10.4313 11.2 10.4313H3.26666C2.36736 10.4313 1.59809 10.116 0.958852 9.48547C0.319617 8.85492 0 8.09611 0 7.20903C0 6.58567 0.170138 6.01027 0.510414 5.48282C0.850695 4.95537 1.30764 4.55978 1.88125 4.29606C1.87153 4.1522 1.86666 4.04911 1.86666 3.98677C1.86666 2.97023 2.23125 2.10233 2.96041 1.38308C3.68958 0.663826 4.56944 0.304199 5.6 0.304199C6.35833 0.304199 7.05226 0.512783 7.68177 0.92995C8.31128 1.34712 8.76944 1.90094 9.05625 2.59142C9.40139 2.29413 9.80486 2.14549 10.2667 2.14549C10.7819 2.14549 11.2219 2.3253 11.5865 2.68493C11.951 3.04455 12.1333 3.4785 12.1333 3.98677C12.1333 4.3512 12.0337 4.68205 11.8344 4.97934C12.4663 5.12799 12.9852 5.45285 13.3911 5.95393C13.797 6.45501 14 7.02682 14 7.66935Z"
                  fill="white" />
              </svg>
              <label for="cargarArchivo">Cargar Archivo</label>

              <input type="checkbox" v-model="permisos.generarReporte" id="generarReporte" name="generarReporte">
              <svg class="mx-1 bg-customPurple w-9 h-7 rounded-full p-1" width="11" height="10" viewBox="0 0 11 10"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.6875 0.290527C0.3025 0.290527 0 0.589853 0 0.970812C0 1.35177 0.3025 1.6511 0.6875 1.6511C1.0725 1.6511 1.375 1.35177 1.375 0.970812C1.375 0.589853 1.0725 0.290527 0.6875 0.290527ZM2.75 0.290527V1.6511H11V0.290527H2.75ZM0.6875 3.01167C0.3025 3.01167 0 3.31099 0 3.69195C0 4.07291 0.3025 4.37224 0.6875 4.37224C1.0725 4.37224 1.375 4.07291 1.375 3.69195C1.375 3.31099 1.0725 3.01167 0.6875 3.01167ZM2.75 3.01167V4.37224H11V3.01167H2.75ZM0.6875 5.73281C0.3025 5.73281 0 6.03213 0 6.41309C0 6.79405 0.3025 7.09338 0.6875 7.09338C1.0725 7.09338 1.375 6.79405 1.375 6.41309C1.375 6.03213 1.0725 5.73281 0.6875 5.73281ZM2.75 5.73281V7.09338H11V5.73281H2.75ZM0.6875 8.45395C0.3025 8.45395 0 8.75327 0 9.13423C0 9.51519 0.3025 9.81452 0.6875 9.81452C1.0725 9.81452 1.375 9.51519 1.375 9.13423C1.375 8.75327 1.0725 8.45395 0.6875 8.45395ZM2.75 8.45395V9.81452H11V8.45395H2.75Z"
                  fill="white" />
              </svg>
              <label for="generarReporte">Generar Reportes</label>

              <input type="checkbox" v-model="permisos.listarUsuarios" id="listarUsuarios" name="listarUsuarios">
              <svg class="mx-1 bg-customPurple w-9 h-7 rounded-full p-1" width="11" height="12" viewBox="0 0 11 12"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.10993 9.72276C6.10585 9.71916 6.10559 9.71856 6.10559 9.71317C6.10559 9.65648 6.10789 9.59889 6.10814 9.54191C6.10865 9.41773 6.11197 9.31516 6.13393 9.19249C6.22072 8.7054 6.52679 8.2918 6.92502 8.12414C7.20047 8.2792 7.52339 8.2795 7.79858 8.12354C8.20319 8.2954 8.51105 8.7189 8.59299 9.21588C8.61903 9.37334 8.61061 9.50261 8.61469 9.65948C8.6152 9.67957 8.62669 9.70627 8.6129 9.72246H6.10993V9.72276Z"
                  fill="white" />
                <path
                  d="M7.32285 6.70192C7.88611 6.66974 8.26568 7.27414 7.98766 7.76213C7.73852 8.19895 7.11456 8.249 6.79998 7.85374C6.43914 7.40038 6.74356 6.73498 7.32285 6.70192Z"
                  fill="white" />
                <path d="M5.88116 0.304199V1.25189H7.9014V3.14727H2.5141V1.25189H4.53434V0.304199H5.88116Z"
                  fill="white" />
                <path
                  d="M3.71009 4.74561H8.31884C8.38479 4.75881 8.41415 4.78619 8.42621 4.82557C8.44632 4.8892 8.44511 5.34351 8.41938 5.39634C8.40771 5.41963 8.38157 5.43716 8.34739 5.44941L3.71049 5.45637C3.6747 5.45013 3.63811 5.43332 3.62162 5.41339C3.58944 5.37401 3.58301 4.88872 3.60272 4.82557C3.61518 4.78619 3.64454 4.75881 3.71009 4.74561Z"
                  fill="white" />
                <path
                  d="M3.65302 6.88037H6.04274C6.07694 6.89358 6.09216 6.92095 6.09841 6.96033C6.10884 7.02397 6.10821 7.47828 6.09487 7.53111C6.08882 7.5544 6.07527 7.57193 6.05754 7.58418L3.65323 7.59114C3.63467 7.5849 3.61569 7.56809 3.60714 7.54816C3.59046 7.50878 3.58712 7.02349 3.59734 6.96033C3.60381 6.92095 3.61903 6.89358 3.65302 6.88037Z"
                  fill="white" />
                <path
                  d="M3.63546 9.01123H5.3424C5.36683 9.02444 5.3777 9.05181 5.38217 9.09119C5.38962 9.15482 5.38917 9.60914 5.37964 9.66197C5.37532 9.68526 5.36563 9.70279 5.35297 9.71504L3.63561 9.722C3.62235 9.71575 3.60879 9.69895 3.60269 9.67902C3.59077 9.63964 3.58839 9.15434 3.59569 9.09119C3.6003 9.05181 3.61118 9.02444 3.63546 9.01123Z"
                  fill="white" />
                <path
                  d="M2.30893 4.57167C3.00116 4.51969 3.09021 5.58472 2.38773 5.63416C1.66006 5.68557 1.56808 4.62729 2.30893 4.57167Z"
                  fill="white" />
                <path
                  d="M2.30823 6.70262C3.00908 6.64924 3.08357 7.71593 2.38711 7.76509C1.67248 7.81538 1.55753 6.75965 2.30823 6.70262Z"
                  fill="white" />
                <path
                  d="M2.30431 8.83664C2.87451 8.79321 3.11112 9.60687 2.564 9.84447C1.7864 10.1821 1.4347 8.90276 2.30431 8.83664Z"
                  fill="white" />
                <path
                  d="M2.04717 1.72705V2.57109H1.02359V11.0115H9.21228V2.57109H8.18869V1.72705H10.2359V11.8555H0V1.72705H2.04717Z"
                  fill="white" />
              </svg>
              <label for="listarUsuarios">Lista de Usuarios</label>

              <input type="checkbox" v-model="permisos.lineaTiempo" id="lineaTiempo" name="lineaTiempo">
              <svg class="mx-1 bg-customPurple w-9 h-7 rounded-full p-1" width="12" height="13" viewBox="0 0 12 13"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.1463 4.75055C11.1601 4.76933 11.4405 4.92512 11.5214 5.00123C12.1654 5.6072 12.1589 6.75437 11.5055 7.34868C11.4241 7.42285 11.1886 7.55208 11.1551 7.61037C11.0728 7.75223 10.9567 8.30638 10.8703 8.52727C10.2604 10.0877 8.96916 11.3524 7.48745 11.8279C7.11092 11.9487 6.76438 11.9652 6.39961 12.0543C6.13331 12.1194 6.09833 12.2518 5.7609 12.1259C5.10102 11.8794 5.43992 11.0214 6.14977 11.1468C6.28292 11.1704 6.39373 11.2893 6.50895 11.3019C7.24055 11.3839 8.60616 10.5291 9.14052 9.98957C13.0101 6.08071 8.9092 -0.924093 4.0267 1.47227C1.88394 2.5239 0.80227 5.23506 1.46832 7.70559C0.208822 7.78753 -0.48515 6.08945 0.394293 5.08122C0.47777 4.98536 0.721145 4.84836 0.764059 4.77613C0.829018 4.66731 0.891038 4.29582 0.946591 4.13518C2.65522 -0.821748 8.96622 -1.01931 10.8703 3.84013C10.9297 3.99203 11.1193 4.71298 11.1463 4.75055Z"
                  fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M8.43941 7.82438C9.58717 5.49342 7.90405 2.73463 5.53225 2.9563C3.49315 3.14692 2.2171 5.64088 3.14399 7.71394C4.20716 10.0919 7.29088 10.157 8.43941 7.82438ZM9.07315 8.19621C10.4912 5.31624 8.41277 1.89883 5.47088 2.17378C2.90581 2.41357 1.35883 5.51191 2.49741 8.05842C3.81818 11.0126 7.64754 11.0915 9.07315 8.19621Z"
                  fill="white" />
                <path
                  d="M7.41182 7.38031C7.11755 8.84019 4.50816 8.82744 4.23535 7.354C5.25888 7.72701 6.38384 7.75066 7.41182 7.38031Z"
                  fill="white" />
              </svg>

              <label for="lineaTiempo">Linea de Tiempo</label>

              <input type="checkbox" v-model="permisos.lineaTiempo" id="rolespermisos" name="rolespermisos" >
              <label for="lineaTiempo">Roles y Permisos</label>
            </div>

            <button type="submit" class="w-full bg-customPurple cursor-pointer text-amarillo border-none font-bold py-2 rounded-lg">
              Guardar Cambios
            </button>
          </form>
        </div>

      </div>
    </div>

    <!-- Modal para Confirmar Eliminación -->
    <div v-if="showDeleteModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">

      <div class="bg-white shadow-lg rounded-lg w-full max-w-lg p-6 relative">

        <button @click="closeDeleteModal"
          class="absolute top-4 right-4 text-customPurple border-none rounded-full p-2 font-bold hover:bg-customPurple hover:text-white">✕</button>
        <div class="text-center">
          <img :src="DeleteSucess" class="" alt="">
          <h2 class="text-xl font-bold mb-0  text-black">¿Estás seguro que</h2>
          <h2 class="text-xl font-bold mb-4 mt-0 text-black">deseas eliminar este usuario?</h2>
          <div class="flex justify-center space-x-4">
            <button @click="openModal"
              class="bg-amarillo text-customPurple cursor-pointer border-none font-bold py-2 px-6 rounded-lg hover:bg-yellow-600">
              Aceptar
            </button>
            <!-- Modal de confirmación -->
            
            <ModalConfirmacionEliminar v-if="isModalOpen" @click="deleteUser" />
            

            <button @click="closeDeleteModal"
              class="bg-customPurple text-amarillo cursor-pointer border-none font-bold py-2 px-6 rounded-lg hover:bg-gray-400">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, reactive } from "vue";
import ListaUsuarios from '@/assets/images/ListaUsuarios.svg';
import IconoEditar from '@/assets/images/IconoEditar.svg';
import IconoEliminar from '@/assets/images/IconoEliminar.svg';
import IconoVisualizar from '@/assets/images/IconoVisualizar.svg';
import RegistroUsuario from '@/assets/images/RegistroUsuario.svg';
import DeleteSucess from '@/assets/images/delete-success.png';
import imagenRegistro from '@/assets/images/imagenRegistro.jpg';
import logoRav from '@/assets/images/LogoPageRav.svg';
import logoSena from '@/assets/images/logosenaverde.svg';
import logoApe from '@/assets/images/logoape.svg';
import Usuario from '@/assets/images/Usuario.svg';
import FondoImagen from '@/assets/images/colombiaCollage1.webp';
import ConfirmacionRegistro from '@/components/ConfirmacionRegistro.vue';
import ModalConfirmacionEliminar from '@/components/ModalConfirmacionEliminar.vue'; // Importa tu componente

// Estados para modales
const showRegisterModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const showSuccessModal = ref(false);
const showViewModal = ref(false);
const showConfirmation = ref(false); // Estado del modal de confirmación

// Usuario seleccionado para ver, editar o eliminar
const selectedUser = reactive({});
const formData = reactive({ name: "", email: "", document: "", rol: "" });

// Lista de usuarios
const users = reactive([
  { nombre: "Juan ", apellido: "Perez", correo: "juan.perez@sena.edu.co", numero_documento: "123456", rol: "Funcionario", sed_nombre: "Sede Central", regional: "Regional Norte", telefono: "123-456-7890", celular: "321-654-9870" },
  { nombre: "Maria ", apellido: "Perez", correo: "juan.perez@sena.edu.co", numero_documento: "123456", rol: "Funcionario", sed_nombre: "Sede Central", regional: "Regional Norte", telefono: "123-456-7890", celular: "321-654-9870" },
]);



const permisos = ref({
  inicio: false,
  mapa: false,
  busqueda: false,
  cargarArchivo: false,
  generarReporte: false,
  listarUsuarios: false,
  lineaTiempo: false,
});

// Funciones para Registrar Usuario
function submitForm() {
  // Agregar el nuevo usuario a la lista
  users.push({ ...formData });
  closeRegisterModal(); // Cerrar la modal después de registrar
}


function closeRegisterModal() {
  // Limpiar los campos del formulario
  formData.name = "";
  formData.email = "";
  formData.document = "";
  formData.rol = "";
  showRegisterModal.value = false;
}

// Función para manejar el clic en "Registrar"
const handleRegister = () => {
  // Lógica para el registro (agregar los datos del formulario, etc.)
  // Después de eso, mostrar el modal de confirmación
  showConfirmation.value = true;
  showRegisterModal.value = false; // Opcionalmente cerrar el modal de registro
};

// Función para cerrar el modal de confirmación
const closeConfirmationModal = () => {
  showConfirmation.value = false;
  showRegisterModal.value = true; // Opcionalmente mostrar el modal de registro nuevamente
};

// Funciones para Ver Usuario
function viewUser(user) {
  Object.assign(selectedUser, user); // Copiar datos del usuario seleccionado
  showViewModal.value = true;
}

function closeViewModal() {
  showViewModal.value = false;
}

// Funciones para Editar Usuario
function editUser(user) {
  Object.assign(selectedUser, user); // Copiar datos del usuario seleccionado
  showEditModal.value = true;
}

function closeEditModal() {
  showEditModal.value = false;
}

function saveUser() {
  // Buscar al usuario y actualizar sus datos
  const index = users.findIndex((u) => u.document === selectedUser.document);
  if (index !== -1) {
    users[index] = { ...selectedUser };
  }
  closeEditModal(); // Cerrar la modal después de guardar
}

// Funciones para Eliminar Usuario
function confirmDeleteUser(user) {
  Object.assign(selectedUser, user); // Copiar datos del usuario seleccionado
  showDeleteModal.value = true;
}

function closeDeleteModal() {
  showDeleteModal.value = false;
}

function deleteUser() {
  // Eliminar al usuario de la lista
  const index = users.findIndex((u) => u.document === selectedUser.document);
  if (index !== -1) users.splice(index, 1);

  closeDeleteModal(); // Cerrar la modal de confirmación
  showSuccessModal.value = true; // Mostrar la modal de éxito
}

// Estado para controlar la visibilidad del modal
const isModalOpen = ref(false);

// Función para abrir el modal
const openModal = () => {
  isModalOpen.value = true;
};

// Función para cerrar el modal
const closeModal = () => {
  isModalOpen.value = false;
};


</script>



<style scoped>
@import "@/styles/table-styles.css";

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Fondo oscuro y desenfoque */
.fixed {
  backdrop-filter: blur(5px);
  z-index: 50;
  /* Asegura que las modales estén encima */
}

.table-container {
  z-index: 10;
  /* Tabla siempre visible */
}


/* Desenfoque del fondo */
.backdrop-blur {
  backdrop-filter: blur(5px);
}

/* Estilo para los rols (botones radio) */
</style>
