<script setup>

document.addEventListener('DOMContentLoaded', function () {
  const scrollLinks = document.querySelectorAll('.smooth-scroll');
  scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

import eyeCare from '../assets/images/eye-care.png';
import diabetesTest from '../assets/images/diabetes-test.png';
import artificialIntelligence from '../assets/images/artificial-intelligence.png';

</script>

<template>

  <!-- Hero Section -->
  <section id="header-section" class="relative bg-blue-500 text-white py-[120px] bg-cover bg-center filter brightness-80 contrast-125 flex items-center justify-center">
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div class="lg:w-3/4 xl:w-2/4 p-[20px] relative z-10 h-100 ">
      <div>
        <h1 class="text-white text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">Illuminate your life with the vision of wellness</h1>
        <p class="text-white text-xl md:text-2xl leading-snug mt-4">Welcome to the Helios. Your trusted Diabetic retinopathy prevension partner</p>
        <router-link :to="{name: 'appointment-create'}" class="px-8 py-4 bg-teal-500 text-white rounded inline-block mt-8 font-semibold scroll-smooth">
          Make an Appointment</router-link>
      </div>
    </div>
  </section>

  <section id="services" class="bg-white py-20 p-5">
    <div class="container mx-auto text-center">
      <h2 class="text-3xl font-bold mb-8">Our Services</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

        <div class="bg-white rounded-lg shadow-md p-6 relative text-center">
          <div class="p-1 inline-block">
            <img :src="eyeCare" class="w-[120px]" alt="">
          </div>
          <h3 class="text-xl font-bold mb-4">Retinopathy Screening</h3>
          <p class="text-gray-700 mb-4">Advanced screening techniques to detect diabetic retinopathy at early stages.</p>
          <a href="#" class="text-blue-500 hover:underline">Learn More</a>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 relative text-center">
          <div class="p-1 inline-block">
            <img :src="diabetesTest" class="w-[120px]" alt="">
          </div>
          <h3 class="text-xl font-bold mb-4">Diabetic Management</h3>
          <p class="text-gray-700 mb-4">Personalized management plans to control diabetes and prevent complications.</p>
          <a href="#" class="text-blue-500 hover:underline">Learn More</a>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 relative text-center">
          <div class="p-1 inline-block">
            <img :src="artificialIntelligence" class="w-[120px]" alt="">
          </div>
          <h3 class="text-xl font-bold mb-4">AI-based Diagnosis</h3>
          <p class="text-gray-700 mb-4">Utilizing AI algorithms for accurate diagnosis and severity level assessment.</p>
          <a href="#" class="text-blue-500 hover:underline">Learn More</a>
        </div>
      </div>
    </div>
  </section>

  <div class="container mx-auto p-4">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="grid gap-4">
        <div>
          <img
              class="h-auto max-w-full rounded-lg"
              src="https://images.pexels.com/photos/5214997/pexels-photo-5214997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
          />
        </div>
        <div>
          <img
              class="h-auto max-w-full rounded-lg"
              src="https://img.freepik.com/free-photo/woman-eyes-consult_23-2148919986.jpg?t=st=1714380705~exp=1714384305~hmac=b6c6fed18bda2913857fe1d1eca431d5fb0e514b4039d50ea673fb5c88b37857&w=740"
              alt=""
          />
        </div>
        <div>
          <img
              class="h-auto max-w-full rounded-lg"
              src="https://img.freepik.com/premium-photo/doctor-looks-eye-exam-with-patient_931065-132.jpg?w=740"
              alt=""
          />
        </div>
      </div>
      <div class="grid gap-4">
        <div>
          <img
              class="h-auto max-w-full rounded-lg"
              src="https://img.freepik.com/premium-photo/medium-shot-woman-getting-her-eyes-checked_23-2150801436.jpg?w=740"
              alt=""
          />
        </div>
        <div>
          <img
              class="h-auto max-w-full rounded-lg"
              src="https://img.freepik.com/premium-photo/female-doctor-smiles-as-she-smiles-her-patient-s-ear_931065-50.jpg?w=360"
              alt=""
          />
        </div>
        <div>
          <img
              class="h-auto max-w-full rounded-lg"
              src="https://img.freepik.com/free-photo/medicine-worker-examining-tension-woman_23-2147648732.jpg?t=st=1714380861~exp=1714384461~hmac=1d70fbd9d4b6bab7d67c8ca65e4c5d72fd0fcb0cbe7b44e4a7dedbc70a396181&w=740"
              alt=""
          />
        </div>
      </div>
      <div class="grid gap-4">
        <div>
          <img
              class="h-auto max-w-full rounded-lg"
              src="https://img.freepik.com/free-photo/side-view-patient-speaking-doctor_23-2148231287.jpg?t=st=1714380989~exp=1714384589~hmac=a8f3955df6136d65a99606f4700fe369b3e9e0e114e007ba0292a24f5dbf8f83&w=740"
              alt=""
          />
        </div>
        <div>
          <img
              class="h-auto max-w-full rounded-lg"
              src="https://img.freepik.com/premium-photo/woman-holding-pills-her-hands_931065-12.jpg?w=360"
              alt=""
          />
        </div>
        <div>
          <img
              class="h-auto max-w-full rounded-lg"
              src="https://staticimg.amarujala.com/assets/images/2021/11/07/750x506/kashi-vishwanath-dham_1636258507.jpeg?w=674&dpr=1.0"
              alt=""
          />
        </div>
      </div>
      <div class="grid gap-4">
        <div>
          <img
              class="h-auto max-w-full rounded-lg"
              src="https://img.freepik.com/free-photo/side-view-patient-undergoing-physical-evaluation_23-2150165431.jpg?t=st=1714381679~exp=1714385279~hmac=f4bb4faee744c54775984ef2d3bb3b8508fd86b45a00a758796ef298a77478a4&w=740"
              alt=""
          />
        </div>
        <div>
          <img
              class="h-auto max-w-full rounded-lg"
              src="https://img.freepik.com/free-photo/doctor-nurse-special-equipment_23-2148980713.jpg?t=st=1714381622~exp=1714385222~hmac=d4a2d2bce92019310360eb51a2aa831ed35e071f7a26cf2fc9603e6c2bedf672&w=740"
              alt=""
          />
        </div>
        <div>
          <img
              class="h-auto max-w-full rounded-lg"
              src="https://img.freepik.com/premium-photo/doctor-girl-are-looking-microscope-looks-eye-exam-with-doctor_931065-4.jpg?w=360"
              alt=""
          />
        </div>
      </div>
    </div>
  </div>


  <!-- component -->
  <section class="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div class="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
    <div class="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
    <div class="mx-auto max-w-2xl lg:max-w-4xl">
      <img class="mx-auto h-12" src="https://tailwindui.com/img/logos/workcation-logo-indigo-600.svg" alt="">
      <figure class="mt-10">
        <blockquote class="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
          <p>“I recommend the Helios diabetic retinopathy detection system for its impressive accuracy in diagnosing and assessing the severity of retinopathy, as well as its seamless appointment-making feature for patients.”</p>
        </blockquote>
        <figcaption class="mt-10">
          <img class="mx-auto h-10 w-10 rounded-full" src="data:image/png;base64,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" alt="">
          <div class="mt-4 flex items-center justify-center space-x-3 text-base">
            <div class="font-semibold text-gray-900">Judith Black</div>
            <svg viewBox="0 0 2 2" width="3" height="3" aria-hidden="true" class="fill-gray-900">
              <circle cx="1" cy="1" r="1" />
            </svg>
            <div class="text-gray-600">CEO of Workcation</div>
          </div>
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
#header-section {
  background-image: url('../../images/cover-bg.jpg');
  background-size: cover;
  background-position: center;
  filter: brightness(80%) contrast(120%);
}
</style>
