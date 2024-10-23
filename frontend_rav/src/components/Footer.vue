<template>
	<div class="flex flex-col min-h-screen">
		<!-- Otros contenidos de la página -->

		<router-view />

		<!-- Pie de página -->
		<footer class="bg-blue-500 p-4 mt-auto">
			<div
				class="container mx-auto flex flex-col sm:flex-row items-center justify-between">
				<!-- Sección del logo -->
				<div class="mb-4 sm:mb-0">
					<svg
						width="125"
						height="31"
						viewBox="0 0 125 31"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<!-- Inserta aquí tu código SVG -->
					</svg>
				</div>

				<!-- Texto del pie de página o enlaces -->
				<div class="text-white text-center sm:text-left">
					<p class="text-sm">
						&copy; 2024 Fabrica Software SENA CDTI DOSQUEBRADAS. Todos los
						derechos reservados.
					</p>
				</div>
			</div>
		</footer>
	</div>
</template>
