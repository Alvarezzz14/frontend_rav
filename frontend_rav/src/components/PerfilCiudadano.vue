<template>
	<div class="bg-white p-6 border-none rounded-lg h-auto">
		<!-- Sección superior: Título e Icono -->
		<div class="flex flex-col lg:flex-row items-center justify-between mb-6">
			<div class="flex items-center">
				<div class="p-4 bg-customPurple rounded-full">
					<!-- Icono SVG -->
					<img
						:src="Ciudadano"
						alt="Icono de Ciudadano"
						width="50"
						height="50" />
				</div>
				<div class="ml-4 text-center lg:text-left">
					<p class="text-black mb-0 text-2xl">Perfil del</p>
					<h2 class="text-customPurple text-5xl mt-0 font-bold">Ciudadano</h2>
				</div>
			</div>
			<!-- Botones de Acción -->
			<div class="flex flex-wrap gap-4 mt-4 justify-center">
				<router-link
					:to="{ name: 'RutaAtencionPage' }"
					class="cursor-pointer bg-customPurple border-none text-white py-4 px-6 rounded-lg flex flex-col items-center justify-center">
					<img
						:src="RutaAtencion"
						alt="Icono de Atención"
						class="w-10 h-10 mb-2" />
					<span class="text-sm">Ver Ruta de Atención</span>
				</router-link>

				<router-link
					:to="{ name: 'LineaTiempoNuevaPage' }"
					class="bg-customPurple border-none text-white py-4 px-6 rounded-lg flex flex-col items-center justify-center">
					<img :src="VerLine" alt="Icono de Ver Línea" class="w-10 h-10 mb-2" />
					<span class="text-sm">Ver Línea de Tiempo</span>
				</router-link>

				<router-link
					:to="{ name: 'RegistroActividadPage' }"
					class="bg-customPurple border-none text-white py-4 px-6 rounded-lg flex flex-col items-center justify-center">
					<img
						:src="Actividad"
						alt="Icono registrar actividad"
						class="w-10 h-10 mb-2" />
					<span class="text-sm">Registrar de Actividad</span>
				</router-link>
			</div>
		</div>

		<!-- Información personal del ciudadano -->
		<div class="flex flex-col lg:flex-row bg-white p-4 rounded-lg gap-8 mb-8">
			<!-- Primera columna -->
			<div class="flex-1">
				<div class="flex items-center">
					<label class="text-black font-semibold w-1/3"
						>TIPO DE DOCUMENTO:</label
					>
					<p class="text-black w-2/3">
						{{ userInfo.tipo_documento || "NO REGISTRA" }}
					</p>
				</div>

				<div class="flex items-center">
					<label class="text-black font-semibold w-1/3">NOMBRE COMPLETO:</label>
					<p class="text-black w-2/3">
						{{ userInfo.nombrecompleto || "NO REGISTRA" }}
					</p>
				</div>

				<div class="flex items-center">
					<label class="text-black font-semibold w-1/3">CIUDAD:</label>
					<p class="text-black w-2/3">{{ userInfo.ciudad || "NO REGISTRA" }}</p>
				</div>

				<div class="flex items-center">
					<label class="text-black font-semibold w-1/3">GENERO:</label>
					<p class="text-black w-2/3">{{ userInfo.genero || "NO REGISTRA" }}</p>
				</div>

				<div class="flex items-center">
					<label class="text-black font-semibold w-1/3">ID HOGAR:</label>
					<p class="text-black w-2/3">
						{{ userInfo.id_hogar || "NO REGISTRA" }}
					</p>
				</div>
			</div>

			<!-- Segunda columna -->
			<div class="flex-1">
				<div class="flex items-center">
					<label class="text-black font-semibold w-1/3"
						>NÚMERO DE DOCUMENTO:</label
					>
					<p class="text-black w-2/3">
						{{ userInfo.documento || "NO REGISTRA" }}
					</p>
				</div>

				<div class="flex items-center">
					<label class="text-black font-semibold w-1/3"
						>PROCEDENCIA ÉTNICA:</label
					>
					<p class="text-black w-2/3">
						{{ userInfo.pertenenciaetnica || "NO REGISTRA" }}
					</p>
				</div>

				<div class="flex items-center">
					<label class="text-black font-semibold w-1/3">ESTADO VICTIMA:</label>
					<p class="text-black w-2/3">
						{{ userInfo.estadovictima || "NO REGISTRA" }}
					</p>
				</div>

				<div class="flex items-center">
					<label class="text-black font-semibold w-1/3">HECHO:</label>
					<p class="text-black w-2/3">{{ userInfo.hecho || "NO REGISTRA" }}</p>
				</div>

				<div class="flex items-center">
					<label class="text-black font-semibold w-1/3"
						>NÚMERO DE CONTACTO:</label
					>
					<p class="text-black w-2/3">
						{{ userInfo.numtelefonocelular || "NO REGISTRA" }}
					</p>
				</div>
			</div>
		</div>
		<!-- Historial del Ciudadano -->
		<div class="text-white rounded-lg shadow-md">
			<!-- Título del historial -->
			<div class="flex items-center bg-customPurple p-px">
				<img :src="Historial" alt="Icono de Historial" class="w-8 h-8 mr-2" />
				<h3 class="text-xl font-bold">HISTORIAL DEL CIUDADANO</h3>
			</div>
			<!-- Contenedor de la tabla con scroll horizontal -->
			<div class="overflow-x-auto">
				<table class="w-full border-collapse">
				<thead>
					<tr>
						<th class="p-3 text-left border-b bg-gray-200 font-bold">
							<svg
								width="20"
								height="15"
								viewBox="0 0 20 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path d="M11.0528 0.499523C11.0763 0.406904 11.4144 0.471647 11.4834 0.472547C11.638 0.475244 11.7972 0.450066 11.9503 0.477043C12.4392 0.561568 12.8243 1.03995 12.9342 1.59836C12.9615 5.35346 12.9623 9.11756 12.9342 12.8718C12.8304 13.4994 12.3771 13.9418 11.8457 13.9994H1.50727C0.978937 13.9508 0.537019 13.5255 0.421044 12.9059C0.391482 9.13105 0.383902 5.34267 0.424834 1.56868C0.519585 1.08221 0.825062 0.663179 1.23363 0.518406C1.40949 0.456361 1.7089 0.455462 1.89916 0.451865C2.02878 0.449167 2.1584 0.44647 2.28498 0.47974C2.30166 0.493229 2.29863 0.515709 2.30014 0.535491C2.35927 1.0975 2.24936 1.80608 2.29939 2.37887C2.37973 3.29247 3.3189 3.74208 3.967 3.29607C4.80611 2.71878 4.4165 1.44639 4.51049 0.516608C4.51276 0.496825 4.51049 0.473446 4.52565 0.460857L8.84023 0.471647V2.24849C8.84023 3.22323 9.84459 3.77715 10.5329 3.28887C10.7406 3.1414 11.0521 2.71248 11.0521 2.41574V0.499523H11.0528ZM1.44511 4.08198L1.42161 4.10985V12.6874C1.42161 12.6928 1.46103 12.7729 1.46785 12.7818C1.50954 12.8322 1.71648 12.8034 1.79076 12.8079C2.02726 12.8214 2.23041 12.8079 2.46463 12.8088C5.53304 12.825 8.60145 12.825 11.6729 12.8079C11.7335 12.8079 11.8146 12.8457 11.8776 12.7917C11.8859 12.7845 11.9314 12.6937 11.9314 12.6883V4.11075L11.9079 4.08288H1.44511V4.08198Z" fill="white"/>									
							</svg>
							FICHA
						</th>
						<th class="p-3 text-left border-b bg-gray-200 font-bold">
							<div class="flex items-center">
								<svg
									width="21"
									height="20"
									viewBox="0 0 21 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path d="M17.9676 5.00018L9.35946 0.051403L9.2064 0L0.474609 5.01708L9.23305 10.0264L17.9676 5.00018ZM17.9334 7.81608C17.9642 7.77454 17.8589 7.6837 17.8316 7.65765C17.5426 7.38232 17.2187 7.12813 16.9071 6.88026L9.20981 11.1531L1.54259 6.90561C1.47768 6.88871 1.15448 7.18446 1.07317 7.25347C0.985712 7.3274 0.508774 7.7337 0.508091 7.79777L9.20981 12.8099L17.9327 7.81538L17.9334 7.81608ZM17.9676 10.5278C17.9368 10.5285 17.9054 10.5123 17.8828 10.4926C17.6252 10.2658 17.274 9.88065 17.0089 9.7018C16.9665 9.67363 16.929 9.63913 16.8736 9.66166L9.23305 13.9359L1.56788 9.69687C1.48793 9.65885 1.42917 9.72856 1.36631 9.77362C1.06497 9.98909 0.795073 10.3398 0.475293 10.5278L9.23646 15.5617L17.9683 10.5278H17.9676Z" fill="white"/>
									<path d="M17.9676 5.00018L9.23304 10.0264L0.474609 5.01708L9.2064 0L9.35945 0.051403L17.9676 5.00018Z" fill="white"/>
									<path d="M17.9674 10.5278L9.23559 15.5618L0.475098 10.5278C0.794878 10.3398 1.06546 9.98912 1.36611 9.77365C1.42897 9.72858 1.48774 9.65887 1.56768 9.6969L9.23285 13.9359L16.8734 9.66169C16.9288 9.63916 16.967 9.67366 17.0087 9.70183C17.2731 9.88068 17.625 10.2659 17.8826 10.4926C17.9052 10.5123 17.9366 10.5285 17.9674 10.5278Z" fill="white"/>
									<path d="M17.9334 7.81609L9.21051 12.8106L0.508789 7.79849C0.508789 7.73371 0.98641 7.32812 1.07387 7.25418C1.15518 7.18518 1.4777 6.88943 1.54329 6.90633L9.21051 11.1538L16.9078 6.88098C17.2194 7.12884 17.5433 7.38234 17.8323 7.65837C17.8596 7.68442 17.9648 7.77525 17.9341 7.8168L17.9334 7.81609Z" fill="white"/>
								</svg>
								<span>CURSO / CERTIFICADO</span>
							</div>
						</th>
						<th class="p-3 text-left border-b bg-gray-200 font-bold">
							<div class="flex items-center">
								<svg
									width="29"
									height="18"
									viewBox="0 0 29 18"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path d="M3.49974 10.9416C3.32617 10.7223 2.15927 9.17913 2.17883 9.03194C3.52093 6.89725 5.21913 4.97726 7.1463 3.54288C12.2295 -0.238994 17.8888 -0.191182 22.932 3.65444C24.7965 5.07569 26.4425 6.94882 27.752 9.03101C26.6927 10.7794 25.3571 12.3638 23.8838 13.6585C17.0258 19.6857 9.11748 18.0338 3.49893 10.9407L3.49974 10.9416ZM11.2174 14.626C10.6666 14.1957 10.1801 13.5741 9.81502 12.9338C8.28142 10.2404 8.53078 6.67226 10.4009 4.28819C10.6071 4.02476 10.9118 3.78382 11.0952 3.54007C11.1351 3.48757 11.193 3.46319 11.1759 3.37601C8.41425 4.43069 5.95903 6.44351 4.13208 9.03101C4.11497 9.14163 5.15557 10.3998 5.30876 10.5713C6.95236 12.4154 8.94881 13.8629 11.1327 14.701L11.2174 14.626ZM18.7143 14.626L18.799 14.701C21.5435 13.6435 23.9849 11.6382 25.8004 9.06382C24.0044 6.44913 21.5239 4.45319 18.7746 3.37976L18.7143 3.46882C18.8349 3.52976 18.9848 3.67132 19.0818 3.77351C21.7847 6.61694 21.7961 11.4038 19.1225 14.2744C19.0149 14.3907 18.8471 14.551 18.7143 14.626ZM14.754 3.67038C10.9648 3.90101 8.9431 8.89882 11.2818 12.3713C13.4771 15.631 18.0241 14.8669 19.3148 11.0279C20.4956 7.51507 18.337 3.82413 15.1076 3.65726L14.7532 3.67038H14.754Z" 
									fill="white" />														
								</svg>
								<span>ESTADO</span>
							</div>
						</th>
						<th class="p-3 text-left border-b bg-gray-200 font-bold">
							<svg
								width="20"
								height="15"
								viewBox="0 0 20 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">								
								<path d="M14.8504 11.8074C14.8214 11.8373 14.7288 12.0539 14.6912 12.1169C14.1792 12.9855 13.5597 13.6894 12.7262 14.2429C12.5992 14.3269 12.2463 14.4974 12.1663 14.5734C12.1146 14.6227 11.8841 15.0938 11.8096 15.2101C9.51132 18.7963 4.44357 18.9563 1.9289 15.5261C-0.347393 12.4207 0.694702 7.92873 4.04289 6.20272C4.62392 5.01731 5.5727 4.02986 6.72692 3.43756C8.39082 0.0235237 12.6611 -1.07947 15.6925 1.18793C19.1285 3.75755 18.9796 9.12546 15.404 11.4826C15.2871 11.5593 14.9163 11.7371 14.8488 11.8074H14.8504ZM15.4636 9.64019C16.4359 8.69073 16.9448 7.22492 16.8311 5.84718C16.595 2.9899 14.0537 0.962484 11.3015 1.46105C10.3833 1.62751 9.47055 2.10992 8.83228 2.80647C10.9408 2.56243 13.0391 3.53937 14.2991 5.27104C15.1954 6.50251 15.6306 8.10246 15.4636 9.64019ZM12.8031 12.4199C12.8383 12.3262 12.9364 12.2648 13.0006 12.1888C15.8909 8.77396 13.0226 3.5022 8.67624 4.21814C7.74392 4.37167 6.80063 4.86054 6.15373 5.56598C8.46531 5.33164 10.7149 6.48474 11.9194 8.51457C12.6329 9.71696 12.8603 10.9096 12.7842 12.3124C12.7827 12.3351 12.7709 12.4199 12.8038 12.4191L12.8031 12.4199ZM6.65478 6.92351C2.95296 7.0124 0.769976 11.329 2.87063 14.4998C4.74153 17.3232 8.78288 17.3232 10.653 14.4998C12.8054 11.2506 10.4531 6.8322 6.65478 6.92351Z" fill="white"/>									
							</svg>
							TIPO
						</th>
						<th class="p-3 text-left border-b bg-gray-200 font-bold">
							<div class="flex items-center">
								<svg
									width="21"
									height="20"
									viewBox="0 0 21 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M0.829102 12.4569V12.3198C0.832856 12.3135 0.839739 12.3078 0.839739 12.3014C0.871188 11.9982 1.00699 11.7158 1.2233 11.5039C1.8073 10.8936 2.39234 10.2854 2.97843 9.67924L4.36376 8.24347L6.67265 5.85094C7.30378 5.19619 7.93492 4.54164 8.56606 3.8873C9.24516 3.18348 9.92427 2.48051 10.6034 1.77838C10.9275 1.44275 11.2472 1.10395 11.5739 0.772131C11.7616 0.581795 11.9581 0.391459 12.1595 0.216983C12.2947 0.0977059 12.468 0.0475841 12.6388 0H12.9091C12.9123 0.00380673 12.9148 0.00951657 12.9185 0.010151C13.2089 0.0634452 13.4385 0.225865 13.6418 0.430794C13.8191 0.609711 13.9939 0.790953 14.1662 0.974522C14.5379 1.36915 14.9064 1.76569 15.2775 2.15968C15.292 2.17245 15.3017 2.19004 15.3046 2.20932C15.3076 2.22861 15.3038 2.24834 15.2937 2.265C15.1899 2.51879 15.0791 2.77257 14.9915 3.03333C14.8772 3.35472 14.8447 3.70016 14.897 4.03767C14.9759 4.50273 15.2393 4.85168 15.5853 5.1467C15.9117 5.44282 16.3398 5.59708 16.7773 5.57622C17.0923 5.55717 17.4008 5.47682 17.6858 5.33957C17.8879 5.24758 18.0825 5.13972 18.284 5.03694C18.2924 5.04314 18.3003 5.04992 18.3078 5.05724C18.6125 5.35734 18.921 5.65426 19.2213 5.95943C19.5574 6.30014 19.8909 6.64338 20.2156 6.99486C20.3025 7.09061 20.3671 7.20489 20.4046 7.32929C20.4422 7.45369 20.4518 7.58505 20.4327 7.7137C20.3977 8.00814 20.2654 8.28188 20.0573 8.49028C19.807 8.75865 19.5492 9.02195 19.2939 9.28652C18.7975 9.80042 18.3015 10.3133 17.806 10.8251C16.8311 11.836 15.8558 12.8452 14.8801 13.8527C14.4505 14.2989 14.0206 14.7452 13.5905 15.1914C12.7475 16.0648 11.9042 16.9383 11.0608 17.8117C10.6707 18.2156 10.2809 18.62 9.89132 19.0248C9.6792 19.2436 9.47334 19.4689 9.24808 19.6738C8.77442 20.1027 8.24694 20.1071 7.75826 19.696C7.62373 19.5831 7.50109 19.4556 7.37532 19.3318C6.97361 18.9366 6.57503 18.5375 6.17207 18.1429C5.91428 17.8891 5.89363 17.7863 6.03754 17.4532C6.29847 16.8499 6.31286 16.242 6.0025 15.6571C5.64022 14.9731 5.06393 14.6178 4.2918 14.6419C4.04152 14.6496 3.79499 14.7251 3.54595 14.7631C3.40044 14.79 3.26211 14.8475 3.13986 14.9319C3.07104 14.9763 3.00158 15.0194 2.93463 15.062C2.92835 15.0583 2.92229 15.0543 2.91648 15.0499C2.3158 14.4015 1.71261 13.755 1.1163 13.1021C1.03055 13.0001 0.960314 12.8857 0.907942 12.7627C0.872511 12.6634 0.846121 12.561 0.829102 12.4569ZM9.32943 13.7512C9.3507 13.7239 9.36634 13.7049 9.38011 13.6846C9.68608 13.2404 9.99331 12.7963 10.2968 12.349C10.3119 12.3225 10.3342 12.3009 10.361 12.2868C10.3879 12.2728 10.4181 12.2668 10.4482 12.2697C10.9657 12.2761 11.4831 12.2786 12.0006 12.2818H12.137C12.1088 12.2424 12.0926 12.2183 12.0744 12.1942C11.7522 11.7609 11.4306 11.3276 11.1058 10.8961C11.0899 10.8778 11.0795 10.8551 11.0759 10.8309C11.0724 10.8067 11.0758 10.782 11.0858 10.7597C11.2585 10.239 11.4297 9.71773 11.5995 9.19579C11.607 9.17358 11.612 9.15011 11.6195 9.11965L11.5814 9.13107C11.0574 9.31422 10.5341 9.49821 10.0115 9.68305C9.98926 9.69358 9.9645 9.69727 9.94025 9.69366C9.916 9.69005 9.89333 9.6793 9.87505 9.66275C9.44205 9.33621 9.00781 9.01095 8.57231 8.68695C8.55166 8.67173 8.52976 8.65777 8.50974 8.64381C8.50974 8.78403 8.50974 8.91536 8.50974 9.04733C8.516 9.48573 8.521 9.92414 8.53227 10.3632C8.53476 10.3882 8.5302 10.4134 8.51912 10.4358C8.50805 10.4583 8.49091 10.4771 8.4697 10.4901C8.03003 10.8077 7.59203 11.1264 7.1557 11.4462C7.1363 11.4602 7.11878 11.476 7.09312 11.4982L7.18072 11.5268C7.69882 11.6873 8.21691 11.844 8.73437 12.009C8.75177 12.0155 8.76768 12.0256 8.78112 12.0386C8.79457 12.0515 8.80527 12.0672 8.81259 12.0845C8.90206 12.3579 8.98654 12.6339 9.07226 12.9093C9.15798 13.1846 9.23995 13.465 9.32943 13.7512ZM15.4789 8.73517L14.755 9.44894L16.3574 11.1867L17.0852 10.4888C16.5458 9.90321 16.0146 9.32204 15.4789 8.73517ZM12.1896 6.97456L13.7926 8.71233L14.5197 8.01443L12.9154 6.2608L12.1896 6.97456ZM9.62414 4.52113L11.2084 6.26207L11.9706 5.59653L10.3631 3.86383L9.62414 4.52113Z"
										fill="white" />
								</svg>
								<span>MODALIDAD</span>
							</div>
						</th>
						<th class="p-3 text-left border-b bg-gray-200 font-bold">
							<div class="flex items-center">
								<svg
									width="29"
									height="18"
									viewBox="0 0 29 18"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M3.49974 10.9416C3.32617 10.7223 2.15927 9.17913 2.17883 9.03194C3.52093 6.89725 5.21913 4.97726 7.1463 3.54288C12.2295 -0.238994 17.8888 -0.191182 22.932 3.65444C24.7965 5.07569 26.4425 6.94882 27.752 9.03101C26.6927 10.7794 25.3571 12.3638 23.8838 13.6585C17.0258 19.6857 9.11748 18.0338 3.49893 10.9407L3.49974 10.9416ZM11.2174 14.626C10.6666 14.1957 10.1801 13.5741 9.81502 12.9338C8.28142 10.2404 8.53078 6.67226 10.4009 4.28819C10.6071 4.02476 10.9118 3.78382 11.0952 3.54007C11.1351 3.48757 11.193 3.46319 11.1759 3.37601C8.41425 4.43069 5.95903 6.44351 4.13208 9.03101C4.11497 9.14163 5.15557 10.3998 5.30876 10.5713C6.95236 12.4154 8.94881 13.8629 11.1327 14.701L11.2174 14.626ZM18.7143 14.626L18.799 14.701C21.5435 13.6435 23.9849 11.6382 25.8004 9.06382C24.0044 6.44913 21.5239 4.45319 18.7746 3.37976L18.7143 3.46882C18.8349 3.52976 18.9848 3.67132 19.0818 3.77351C21.7847 6.61694 21.7961 11.4038 19.1225 14.2744C19.0149 14.3907 18.8471 14.551 18.7143 14.626ZM14.754 3.67038C10.9648 3.90101 8.9431 8.89882 11.2818 12.3713C13.4771 15.631 18.0241 14.8669 19.3148 11.0279C20.4956 7.51507 18.337 3.82413 15.1076 3.65726L14.7532 3.67038H14.754Z"
										fill="white" />
									<path
										d="M12.5628 8.01577C12.7486 8.09358 12.888 8.25577 13.0811 8.33358C14.0149 8.71046 14.8942 7.90139 14.8029 6.77358C14.7834 6.53264 14.6644 6.35358 14.6587 6.13796C15.6952 5.92889 16.8344 6.68171 17.2769 7.77108C17.9011 9.30671 17.2956 11.1386 15.9315 11.7733C13.8609 12.737 11.8034 10.4073 12.5636 8.01483L12.5628 8.01577Z"
										fill="white" />
								</svg>

								<span>FECHA INICIO</span>
							</div>
						</th>
						<th class="p-3 text-left border-b bg-gray-200 font-bold">
							<div class="flex items-center">
								<svg
									width="29"
									height="18"
									viewBox="0 0 29 18"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M3.49974 10.9416C3.32617 10.7223 2.15927 9.17913 2.17883 9.03194C3.52093 6.89725 5.21913 4.97726 7.1463 3.54288C12.2295 -0.238994 17.8888 -0.191182 22.932 3.65444C24.7965 5.07569 26.4425 6.94882 27.752 9.03101C26.6927 10.7794 25.3571 12.3638 23.8838 13.6585C17.0258 19.6857 9.11748 18.0338 3.49893 10.9407L3.49974 10.9416ZM11.2174 14.626C10.6666 14.1957 10.1801 13.5741 9.81502 12.9338C8.28142 10.2404 8.53078 6.67226 10.4009 4.28819C10.6071 4.02476 10.9118 3.78382 11.0952 3.54007C11.1351 3.48757 11.193 3.46319 11.1759 3.37601C8.41425 4.43069 5.95903 6.44351 4.13208 9.03101C4.11497 9.14163 5.15557 10.3998 5.30876 10.5713C6.95236 12.4154 8.94881 13.8629 11.1327 14.701L11.2174 14.626ZM18.7143 14.626L18.799 14.701C21.5435 13.6435 23.9849 11.6382 25.8004 9.06382C24.0044 6.44913 21.5239 4.45319 18.7746 3.37976L18.7143 3.46882C18.8349 3.52976 18.9848 3.67132 19.0818 3.77351C21.7847 6.61694 21.7961 11.4038 19.1225 14.2744C19.0149 14.3907 18.8471 14.551 18.7143 14.626ZM14.754 3.67038C10.9648 3.90101 8.9431 8.89882 11.2818 12.3713C13.4771 15.631 18.0241 14.8669 19.3148 11.0279C20.4956 7.51507 18.337 3.82413 15.1076 3.65726L14.7532 3.67038H14.754Z"
										fill="white" />
									<path
										d="M12.5628 8.01577C12.7486 8.09358 12.888 8.25577 13.0811 8.33358C14.0149 8.71046 14.8942 7.90139 14.8029 6.77358C14.7834 6.53264 14.6644 6.35358 14.6587 6.13796C15.6952 5.92889 16.8344 6.68171 17.2769 7.77108C17.9011 9.30671 17.2956 11.1386 15.9315 11.7733C13.8609 12.737 11.8034 10.4073 12.5636 8.01483L12.5628 8.01577Z"
										fill="white" />
								</svg>
								<span>FECHA FIN</span>
							</div>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(course, index) in userInfo.historial" :key="index">
							<td class="px-4 py-2 border">{{ course.ficha }}</td>
							<td class="px-4 py-2 border">{{ course.curso }}</td>
							<td class="px-4 py-2 border">{{ course.estado }}</td>
							<td class="px-4 py-2 border">{{ course.tipo }}</td>
							<td class="px-4 py-2 border">{{ course.modalidad }}</td>
							<td class="px-4 py-2 border">{{ course.fecha_inicio }}</td>
							<td class="px-4 py-2 border">{{ course.fecha_fin }}</td>
						</tr>
				</tbody>
			</table>
			</div>
		</div>
	</div>
</template>

<script setup>
// Simulación de datos desde una API
import { ref, onMounted } from "vue";
import RutaAtencion from "@/assets/images/ruta.svg";
import Ciudadano from "@/assets/images/Usuario.svg";
import VerLine from "@/assets/images/VerLine.svg";
import Actividad from "@/assets/images/Actividad.png";
import Historial from "@/assets/images/Historial.svg";
import { useEventStore } from "@/stores/storedataOff.js"; // Cambiar según tu estructura de store

//Store para obtener los datos
const eventStore = useEventStore();
const userInfo = eventStore.userInfo; // Obtener los datos directamente desde el store

onMounted(async () => {
  userInfo.value = eventStore.userInfo; // Deberás reemplazar esto por la llamada a la API
   console.log(userInfo.value);
});
</script>

<style scoped>
table {
	border-collapse: separate;
	border-spacing: 1px 1px; /* Espacio entre celdas */
	min-width: 100%;
	margin-top: 1rem;
}

th,
td {
	border: 1px solid #ccc; /* Borde individual para cada celda */
	background-color: #fff; /* Fondo blanco para celdas */
	text-align: left; /* Alinear texto a la izquierda */
}

thead th {
	background-color: #71277a;
	color: #fff;
	font-weight: bold;
	border-radius: 0.5rem 0.5rem 0rem 0rem;
	overflow: hidden;
	padding: 12px;
}

tbody tr:hover td {
	background-color: #f9f9f9; /* Fondo más claro al pasar el cursor */
}

tbody td {
	padding: 10px; /* Espaciado interno en las celdas */
}

</style>
