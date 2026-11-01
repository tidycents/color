/* TidyCents · 7 personalized coloring stories (EN/ES). Scene items: [set, art, x, y, size, flip]; 'F' = the friend the buyer picked. */
(function () {
  const S = TCK.story;
  // ---------- 1. Beach ----------
  S({ id: 'st-beach', title: 'Day at the Beach', titleEs: 'Día de playa',
    cert: 'You read and colored your beach story!', certEs: '¡Leíste y coloreaste tu cuento de la playa!',
    friends: [{ id: 'turtle', set: 'ocean', art: 'turtle', label: 'Sea Turtle', es: 'la tortuga marina', un: 'una tortuga marina' }, { id: 'dolphin', set: 'ocean', art: 'dolphin', label: 'Dolphin', es: 'el delfín', un: 'un delfín' }, { id: 'octopus', set: 'ocean', art: 'octopus', label: 'Octopus', es: 'el pulpo', un: 'un pulpo' }, { id: 'crab', set: 'ocean', art: 'crab', label: 'Crab', es: 'el cangrejo', un: 'un cangrejo' }],
    cover: [['ocean', 'F', 425, 600, 330], ['ocean', 'castle', 190, 700, 150], ['ocean', 'bucket', 680, 720, 110], ['ocean', 'starfish', 600, 790, 70], ['ocean', 'sun', 690, 430, 100]],
    pages: [
      { en: '{name} wakes up early. Today is beach day!', es: '{name} se despierta temprano. ¡Hoy es día de playa!', g: 'sand', s: [['ocean', 'sun', 640, 420, 150], ['ocean', 'umbrella', 260, 680, 300], ['ocean', 'chair', 470, 780, 170], ['ocean', 'bucket', 650, 820, 110]] },
      { en: 'On the sand, {name} meets a new friend: the {friend}!', es: 'En la arena, {name} conoce a un nuevo amigo: ¡{friend}!', g: 'sand', s: [['ocean', 'F', 425, 640, 380], ['ocean', 'shell', 180, 900, 80], ['ocean', 'starfish', 690, 905, 80]] },
      { en: '{name} and the {friend} build a tall sandcastle.', es: '{name} y {friend} construyen un castillo de arena muy alto.', g: 'sand', s: [['ocean', 'castle', 330, 680, 300], ['ocean', 'F', 620, 720, 230], ['ocean', 'shovel', 160, 790, 130], ['ocean', 'bucket', 700, 900, 90]] },
      { en: 'They find shells and a starfish. One, two, three!', es: 'Encuentran conchas y una estrella de mar. ¡Una, dos, tres!', g: 'sand', s: [['ocean', 'shell', 200, 760, 130], ['ocean', 'shell', 330, 820, 100], ['ocean', 'starfish', 520, 770, 170], ['ocean', 'F', 680, 640, 190]] },
      { en: 'Splash! {name} and the {friend} play with a beach ball.', es: '¡Chapuzón! {name} y {friend} juegan con una pelota de playa.', g: 'water', gy: 820, s: [['ocean', 'ball', 330, 560, 200], ['ocean', 'F', 590, 640, 260]] },
      { en: 'Under the water, little fish swim in a line.', es: 'Bajo el agua, los pececitos nadan en fila.', g: 'none', s: [['ocean', 'fish', 200, 480, 140], ['ocean', 'fish', 390, 560, 140], ['ocean', 'fish', 580, 640, 140], ['ocean', 'seaweed', 140, 860, 220], ['ocean', 'seaweed', 700, 850, 240], ['ocean', 'rock', 440, 920, 200]] },
      { en: 'A jellyfish dances and a big whale says hello.', es: 'Una medusa baila y una ballena grande saluda.', g: 'none', s: [['ocean', 'jellyfish', 230, 520, 220], ['ocean', 'whale', 520, 760, 380]] },
      { en: 'The {friend} shows {name} a secret rock garden.', es: '{Friend} le enseña a {name} un jardín secreto de rocas.', g: 'none', s: [['ocean', 'rock', 260, 900, 260], ['ocean', 'rock', 560, 920, 220], ['ocean', 'seaweed', 170, 760, 200], ['ocean', 'seaweed', 640, 760, 200], ['ocean', 'F', 420, 560, 260]] },
      { en: 'Time for a rest under the umbrella. What a fun day!', es: 'Hora de descansar bajo la sombrilla. ¡Qué día tan divertido!', g: 'sand', s: [['ocean', 'umbrella', 330, 650, 340], ['ocean', 'chair', 360, 810, 160], ['ocean', 'F', 620, 790, 170]] },
      { en: 'The sun goes down. "See you tomorrow, {friend}!" says {name}.', es: 'El sol se esconde. "¡Hasta mañana!", le dice {name} a {friend}.', g: 'water', gy: 700, s: [['ocean', 'sun', 425, 600, 220], ['ocean', 'F', 425, 880, 180]] }
    ] });

  // ---------- 2. Farm ----------
  S({ id: 'st-farm', title: 'Day on the Farm', titleEs: 'Un día en la granja',
    cert: 'You read and colored your farm story!', certEs: '¡Leíste y coloreaste tu cuento de la granja!',
    friends: [{ id: 'puppy', set: 'animals', art: 'puppy', label: 'Puppy', es: 'el perrito' }, { id: 'kitten', set: 'animals', art: 'kitten', label: 'Kitten', es: 'el gatito' }, { id: 'lamb', set: 'animals', art: 'lamb', label: 'Lamb', es: 'el corderito' }, { id: 'chick', set: 'animals', art: 'chick', label: 'Chick', es: 'el pollito' }],
    cover: [['animals', 'F', 425, 600, 320], ['animals', 'barn', 190, 640, 200], ['animals', 'tree', 680, 640, 190], ['animals', 'hen', 650, 800, 110]],
    pages: [
      { en: 'Cock-a-doodle-doo! {name} wakes up on the farm.', es: '¡Quiquiriquí! {name} se despierta en la granja.', g: 'grass', s: [['animals', 'barn', 300, 680, 340], ['animals', 'hen', 600, 760, 180], ['animals', 'tree', 690, 640, 200]] },
      { en: 'The {friend} runs to say good morning to {name}.', es: '{Friend} corre a darle los buenos días a {name}.', g: 'grass', s: [['animals', 'F', 425, 660, 380], ['animals', 'tree', 160, 700, 200]] },
      { en: 'Together they feed the hens and the little chicks.', es: 'Juntos les dan de comer a las gallinas y a los pollitos.', g: 'grass', s: [['animals', 'hen', 220, 740, 220], ['animals', 'chick', 380, 800, 120], ['animals', 'chick', 480, 810, 110], ['animals', 'seeds', 420, 900, 110], ['animals', 'F', 650, 700, 220]] },
      { en: 'The cow says "Moo!" and the calf says "Moo!" too.', es: 'La vaca dice "¡Muu!" y el becerro también dice "¡Muu!".', g: 'grass', s: [['animals', 'cow', 290, 690, 330], ['animals', 'calf', 590, 740, 230]] },
      { en: '{name} brushes the horse. It is very tall!', es: '{name} cepilla al caballo. ¡Es muy alto!', g: 'grass', s: [['animals', 'horse', 400, 640, 400], ['animals', 'F', 680, 790, 160]] },
      { en: 'The pigs play in the mud. Oink, oink!', es: 'Los cerditos juegan en el lodo. ¡Oinc, oinc!', g: 'grass', s: [['animals', 'pig', 270, 740, 240], ['animals', 'pig', 520, 760, 200, true], ['animals', 'F', 680, 640, 160]] },
      { en: 'The sheep and the lamb need a haircut. Snip, snip!', es: 'La oveja y el corderito necesitan un corte de pelo. ¡Tris, tras!', g: 'grass', s: [['animals', 'sheep', 290, 700, 300], ['animals', 'lamb', 580, 760, 200]] },
      { en: 'Ducks swim in the pond. {name} counts them: one, two, three.', es: 'Los patos nadan en el estanque. {name} los cuenta: uno, dos, tres.', g: 'water', gy: 760, s: [['animals', 'duck', 230, 680, 180], ['animals', 'duckling', 420, 700, 120], ['animals', 'duckling', 560, 705, 120]] },
      { en: 'They pick carrots for a snack. Crunch!', es: 'Recogen zanahorias para merendar. ¡Crunch!', g: 'grass', s: [['animals', 'carrot', 250, 760, 200], ['animals', 'carrot', 400, 780, 170], ['animals', 'rabbit', 580, 720, 230]] },
      { en: 'Night falls. "Good night, farm! Good night, {friend}!"', es: 'Llega la noche. "¡Buenas noches, granja! ¡Buenas noches!", dice {name}.', g: 'grass', s: [['animals', 'barn', 330, 680, 330], ['animals', 'F', 620, 760, 220], ['nature', 'cloud', 640, 440, 150]] }
    ] });

  // ---------- 3. Garden ----------
  S({ id: 'st-garden', title: 'Garden Adventure', titleEs: 'Aventura en el jardín',
    cert: 'You read and colored your garden story!', certEs: '¡Leíste y coloreaste tu cuento del jardín!',
    friends: [{ id: 'ladybug', set: 'nature', art: 'ladybug', label: 'Ladybug', es: 'la mariquita' }, { id: 'bee', set: 'nature', art: 'bee', label: 'Bee', es: 'la abeja' }, { id: 'butterfly', set: 'nature', art: 'butterfly', label: 'Butterfly', es: 'la mariposa' }, { id: 'frog', set: 'nature', art: 'frog', label: 'Frog', es: 'la rana' }],
    cover: [['nature', 'F', 425, 600, 320], ['nature', 'bloom', 180, 700, 200], ['nature', 'bloom', 680, 710, 180], ['nature', 'sun', 690, 430, 110]],
    pages: [
      { en: 'The sun is shining. {name} goes out to the garden.', es: 'Brilla el sol. {name} sale al jardín.', g: 'grass', s: [['nature', 'sun', 620, 450, 180], ['nature', 'bloom', 250, 720, 230], ['nature', 'bloom', 420, 740, 200], ['nature', 'cloud', 260, 440, 180]] },
      { en: 'On a flower, {name} finds a new friend: the {friend}!', es: 'En una flor, {name} encuentra una nueva amistad: ¡{friend}!', g: 'grass', s: [['nature', 'bloom', 300, 700, 300], ['nature', 'F', 560, 600, 300]] },
      { en: 'They plant a tiny seed in the soil.', es: 'Siembran una semillita en la tierra.', g: 'none', s: [['nature', 'plant', 330, 720, 320], ['nature', 'can', 600, 640, 220]] },
      { en: 'Drip, drop! The rain waters the garden.', es: '¡Plic, ploc! La lluvia riega el jardín.', g: 'grass', s: [['nature', 'rain', 300, 520, 260], ['nature', 'rain', 560, 480, 220], ['nature', 'F', 440, 780, 200]] },
      { en: '{name} and the {friend} jump over a puddle!', es: '¡{name} y {friend} brincan sobre un charco!', g: 'none', s: [['nature', 'puddle', 420, 860, 320], ['nature', 'F', 420, 560, 260], ['nature', 'rainwear', 650, 760, 200]] },
      { en: 'Busy ants march in a line. Left, right, left!', es: 'Las hormigas trabajadoras marchan en fila. ¡Izquierda, derecha!', g: 'grass', s: [['nature', 'ant', 170, 800, 120], ['nature', 'ant', 330, 800, 120], ['nature', 'ant', 490, 800, 120], ['nature', 'ant', 650, 800, 120], ['nature', 'F', 425, 540, 220]] },
      { en: 'The wind blows. {name} flies a kite way up high.', es: 'Sopla el viento. {name} vuela un papalote muy alto.', g: 'none', s: [['nature', 'kiteHigh', 425, 640, 520], ['nature', 'wind', 180, 460, 160]] },
      { en: 'It is hot! {name} and the {friend} share an ice cream.', es: '¡Hace calor! {name} y {friend} comparten un helado.', g: 'grass', s: [['nature', 'ice', 330, 620, 280], ['nature', 'F', 580, 720, 220], ['nature', 'sun', 650, 420, 130]] },
      { en: 'The little seed grew into a beautiful flower!', es: '¡La semillita creció y es una flor preciosa!', g: 'grass', s: [['nature', 'bloom', 425, 660, 400], ['nature', 'bigfly', 680, 470, 150]] },
      { en: '"Thank you for a lovely day, {friend}!" says {name}.', es: '"¡Gracias por este día tan bonito!", le dice {name} a {friend}.', g: 'grass', s: [['nature', 'F', 425, 640, 320], ['nature', 'bloom', 170, 760, 170], ['nature', 'bloom', 680, 760, 170]] }
    ] });

  // ---------- 4. Big ride ----------
  S({ id: 'st-ride', title: 'Big Ride Around Town', titleEs: 'Gran paseo por la ciudad',
    cert: 'You read and colored your ride story!', certEs: '¡Leíste y coloreaste tu cuento del paseo!',
    friends: [{ id: 'racecar', set: 'wheels', art: 'racecar', label: 'Race Car', es: 'el carro de carreras' }, { id: 'bus', set: 'wheels', art: 'bus', label: 'School Bus', es: 'el autobús escolar' }, { id: 'train', set: 'wheels', art: 'train', label: 'Train', es: 'el tren' }, { id: 'firetruck', set: 'wheels', art: 'firetruck', label: 'Fire Truck', es: 'el camión de bomberos' }],
    cover: [['wheels', 'F', 425, 640, 380], ['wheels', 'house', 170, 600, 150], ['wheels', 'sun', 690, 430, 110], ['wheels', 'balloon', 640, 520, 110]],
    pages: [
      { en: 'Beep, beep! The {friend} stops in front of {name}\'s house.', es: '¡Pi, pi! {Friend} se detiene frente a la casa de {name}.', g: 'road', gy: 800, s: [['wheels', 'house', 250, 620, 280], ['wheels', 'F', 560, 740, 320]] },
      { en: '{name} jumps in. Let\'s go for a big ride!', es: '{name} se sube. ¡Vamos a dar un gran paseo!', g: 'road', gy: 800, s: [['wheels', 'F', 425, 720, 460], ['wheels', 'sun', 660, 430, 120]] },
      { en: 'First stop: the school. Hello, teacher!', es: 'Primera parada: la escuela. ¡Hola, maestra!', g: 'road', gy: 820, s: [['wheels', 'school', 300, 620, 320], ['wheels', 'F', 620, 760, 220]] },
      { en: 'At the park, a bicycle rings its bell. Ring, ring!', es: 'En el parque, una bicicleta toca su timbre. ¡Rin, rin!', g: 'grass', s: [['wheels', 'park', 300, 640, 300], ['wheels', 'bicycle', 560, 760, 220]] },
      { en: 'Stop! The road is blocked. They take another way.', es: '¡Alto! El camino está cerrado. Toman otro camino.', g: 'road', gy: 800, s: [['wheels', 'barrier', 330, 700, 220], ['wheels', 'F', 590, 740, 260, true]] },
      { en: 'A big excavator digs a hole. Scoop, scoop!', es: 'Una excavadora grande hace un hoyo. ¡Pala, pala!', g: 'floor', s: [['wheels', 'excavator', 400, 700, 380], ['wheels', 'truck', 680, 790, 160]] },
      { en: 'Look up! An airplane and a helicopter fly by.', es: '¡Mira arriba! Pasan un avión y un helicóptero.', g: 'none', s: [['wheels', 'airplane', 300, 500, 300], ['wheels', 'helicopter', 560, 720, 260], ['wheels', 'cloud', 640, 430, 150]] },
      { en: 'At the lake, boats float on the water.', es: 'En el lago, los barcos flotan en el agua.', g: 'water', gy: 820, s: [['wheels', 'sailboat', 300, 700, 260], ['wheels', 'boat', 560, 760, 220]] },
      { en: 'Race time! The {friend} zooms to the finish line.', es: '¡Hora de la carrera! {Friend} llega volando a la meta.', g: 'road', gy: 800, s: [['wheels', 'flagFinish', 640, 640, 200], ['wheels', 'F', 360, 740, 320]] },
      { en: 'Back home. "Thank you for the ride, {friend}!"', es: 'De regreso a casa. "¡Gracias por el paseo!", dice {name}.', g: 'road', gy: 800, s: [['wheels', 'house', 560, 620, 280], ['wheels', 'F', 270, 740, 260], ['wheels', 'sun', 200, 430, 110]] }
    ] });

  // ---------- 5. Fruit picnic ----------
  S({ id: 'st-picnic', title: 'Fruit Friends Picnic', titleEs: 'El pícnic de las frutas',
    cert: 'You read and colored your picnic story!', certEs: '¡Leíste y coloreaste tu cuento del pícnic!',
    friends: [{ id: 'apple', set: 'fruit', art: 'friend:apple', label: 'Apple', es: 'la manzana' }, { id: 'banana', set: 'fruit', art: 'friend:banana', label: 'Banana', es: 'el plátano' }, { id: 'strawberry', set: 'fruit', art: 'friend:strawberry', label: 'Strawberry', es: 'la fresa' }, { id: 'pineapple', set: 'fruit', art: 'friend:pineapple', label: 'Pineapple', es: 'la piña' }],
    cover: [['fruit', 'F', 425, 610, 300], ['fruit', 'grapes', 190, 700, 130], ['fruit', 'watermelon', 660, 720, 150], ['fruit', 'cherry', 640, 520, 90]],
    pages: [
      { en: 'Today {name} is going on a picnic with the {friend}!', es: '¡Hoy {name} va de pícnic con {friend}!', g: 'grass', s: [['fruit', 'F', 425, 650, 340], ['animals', 'tree', 180, 680, 220], ['wheels', 'sun', 660, 440, 120]] },
      { en: 'They pack red apples and yellow bananas.', es: 'Empacan manzanas rojas y plátanos amarillos.', g: 'floor', s: [['fruit', 'apple', 220, 740, 160], ['fruit', 'apple', 360, 750, 140], ['fruit', 'banana', 540, 740, 180], ['fruit', 'banana', 680, 760, 150]] },
      { en: 'Then purple grapes and sweet cherries.', es: 'Luego uvas moradas y cerezas dulces.', g: 'floor', s: [['fruit', 'grapes', 280, 720, 220], ['fruit', 'cherry', 540, 730, 200]] },
      { en: 'Let\'s cut the big watermelon! One slice for everyone.', es: '¡A cortar la sandía grande! Una rebanada para cada uno.', g: 'floor', s: [['fruit', 'watermelon', 300, 720, 260], ['fruit', 'melonSlice', 560, 770, 160], ['fruit', 'melonSlice', 700, 780, 130]] },
      { en: 'The kiwi is brown outside and green inside!', es: '¡El kiwi es café por fuera y verde por dentro!', g: 'floor', s: [['fruit', 'kiwi', 300, 740, 220], ['fruit', 'kiwiSlice', 560, 740, 200]] },
      { en: 'The orange makes a sunny face. Smile!', es: 'La naranja tiene una cara de sol. ¡Sonríe!', g: 'floor', s: [['fruit', 'orange', 300, 720, 220], ['fruit', 'orangeSlice', 560, 730, 200]] },
      { en: '{name} shares a pear with the {friend}.', es: '{name} comparte una pera con {friend}.', g: 'grass', s: [['fruit', 'pear', 300, 700, 220], ['fruit', 'F', 560, 680, 280]] },
      { en: 'A bunny comes for a carrot. Crunch, crunch!', es: 'Un conejito viene por una zanahoria. ¡Crunch, crunch!', g: 'grass', s: [['animals', 'rabbit', 300, 700, 260], ['fruit', 'carrot', 560, 720, 220]] },
      { en: 'All the fruit friends dance together. What a party!', es: 'Todas las frutas bailan juntas. ¡Qué fiesta!', g: 'grass', s: [['fruit', 'friend:apple', 180, 700, 180], ['fruit', 'friend:banana', 340, 690, 180], ['fruit', 'friend:strawberry', 500, 700, 180], ['fruit', 'friend:pineapple', 660, 690, 190]] },
      { en: '"Healthy and happy!" says {name}. "See you next picnic!"', es: '"¡Sanos y felices!", dice {name}. "¡Nos vemos en el próximo pícnic!"', g: 'grass', s: [['fruit', 'F', 425, 650, 340], ['fruit', 'appleHalf', 200, 790, 130], ['fruit', 'cherry', 660, 790, 120]] }
    ] });

  // ---------- 6. Zoo ----------
  S({ id: 'st-zoo', title: 'Trip to the Zoo', titleEs: 'Paseo al zoológico',
    cert: 'You read and colored your zoo story!', certEs: '¡Leíste y coloreaste tu cuento del zoológico!',
    friends: [{ id: 'cub', set: 'animals', art: 'cub', label: 'Lion Cub', es: 'el leoncito' }, { id: 'monkey', set: 'animals', art: 'monkey', label: 'Monkey', es: 'el monito' }, { id: 'bear', set: 'animals', art: 'bear', label: 'Bear', es: 'el oso' }],
    cover: [['animals', 'F', 425, 600, 320], ['animals', 'trees', 180, 650, 200], ['animals', 'bird', 660, 520, 110], ['animals', 'snake', 670, 760, 140]],
    pages: [
      { en: 'Hooray! {name} rides the bus to the zoo.', es: '¡Hurra! {name} va en autobús al zoológico.', g: 'road', gy: 800, s: [['wheels', 'bus', 425, 720, 420], ['wheels', 'sun', 660, 430, 120]] },
      { en: 'At the gate, a friendly {friend} waves hello.', es: 'En la entrada, {friend} saluda con alegría.', g: 'grass', s: [['animals', 'F', 425, 660, 380], ['animals', 'trees', 150, 700, 200]] },
      { en: 'The lion gives a big ROAR! The cub gives a tiny roar.', es: '¡El león da un gran RUGIDO! El leoncito da un rugido chiquito.', g: 'grass', s: [['animals', 'lion', 300, 690, 320], ['animals', 'cub', 590, 760, 200]] },
      { en: 'The monkey swings from tree to tree.', es: 'El monito se columpia de árbol en árbol.', g: 'grass', s: [['animals', 'trees', 300, 650, 380], ['animals', 'monkey', 560, 600, 220]] },
      { en: 'Shh! The bear is taking a nap.', es: '¡Shh! El oso está tomando una siesta.', g: 'grass', s: [['animals', 'bear', 400, 720, 340], ['nature', 'cloud', 640, 450, 140]] },
      { en: 'The snake wiggles. Hiss, hiss!', es: 'La serpiente se mueve. ¡Sss, sss!', g: 'grass', s: [['animals', 'snake', 425, 720, 360]] },
      { en: 'Colorful birds sing a happy song.', es: 'Los pájaros de colores cantan una canción alegre.', g: 'none', s: [['animals', 'tree', 260, 680, 360], ['animals', 'bird', 520, 520, 180], ['animals', 'bird', 640, 680, 150, true]] },
      { en: 'In the big tank, the fish and the whale swim around.', es: 'En el gran tanque nadan los peces y la ballena.', g: 'water', gy: 880, s: [['animals', 'whale', 400, 620, 340], ['animals', 'fish', 220, 800, 140], ['animals', 'fish', 620, 800, 140, true]] },
      { en: '{name} and the {friend} eat bananas for a snack.', es: '{name} y {friend} comen plátanos de merienda.', g: 'grass', s: [['animals', 'F', 330, 680, 300], ['animals', 'banana', 580, 720, 180]] },
      { en: '"Bye, zoo! Bye, {friend}! I will come back soon!"', es: '"¡Adiós, zoológico! ¡Volveré pronto!", dice {name}.', g: 'grass', s: [['animals', 'F', 425, 640, 320], ['animals', 'trees', 160, 700, 190], ['animals', 'trees', 690, 700, 190]] }
    ] });

  // ---------- 7. Sea voyage ----------
  S({ id: 'st-sail', title: 'Sailing the Sea', titleEs: 'Navegando por el mar',
    cert: 'You read and colored your sailing story!', certEs: '¡Leíste y coloreaste tu cuento del mar!',
    friends: [{ id: 'dolphin', set: 'ocean', art: 'dolphin', label: 'Dolphin', es: 'el delfín' }, { id: 'whale', set: 'ocean', art: 'whale', label: 'Whale', es: 'la ballena' }, { id: 'fish', set: 'ocean', art: 'fish', label: 'Fish', es: 'el pez' }, { id: 'octopus', set: 'ocean', art: 'octopus', label: 'Octopus', es: 'el pulpo' }],
    cover: [['wheels', 'sailboat', 425, 560, 300], ['ocean', 'F', 250, 760, 170], ['ocean', 'fish', 640, 780, 110], ['wheels', 'sun', 680, 430, 110]],
    pages: [
      { en: 'Captain {name} is ready to sail the big blue sea!', es: '¡La capitana o el capitán {name} está listo para navegar!', g: 'water', gy: 800, s: [['wheels', 'sailboat', 425, 640, 380], ['wheels', 'sun', 660, 430, 120]] },
      { en: 'The wind blows the sail. Whoosh!', es: 'El viento empuja la vela. ¡Fiuuu!', g: 'water', gy: 800, s: [['wheels', 'sailboat', 480, 640, 360], ['nature', 'wind', 200, 520, 200]] },
      { en: 'Splash! A friendly {friend} swims next to the boat.', es: '¡Chapuzón! {Friend} nada junto al barco.', g: 'water', gy: 760, s: [['wheels', 'sailboat', 300, 600, 300], ['ocean', 'F', 590, 840, 220]] },
      { en: '{name} sees a big ship far away. Toot, toot!', es: '{name} ve un barco grande a lo lejos. ¡Tu, tuuu!', g: 'water', gy: 780, s: [['wheels', 'ship', 520, 680, 320], ['wheels', 'cloud', 220, 470, 160]] },
      { en: 'Down below, fish swim in and out of the seaweed.', es: 'Abajo, los peces nadan entre las algas.', g: 'none', s: [['ocean', 'fish', 220, 500, 140], ['ocean', 'fish', 480, 600, 130, true], ['ocean', 'seaweed', 160, 820, 240], ['ocean', 'seaweed', 680, 820, 240], ['ocean', 'starfish', 430, 900, 120]] },
      { en: 'A jellyfish and a crab say hello to the {friend}.', es: 'Una medusa y un cangrejo saludan a ' + '{friend}.', g: 'none', s: [['ocean', 'jellyfish', 230, 560, 200], ['ocean', 'crab', 600, 840, 200], ['ocean', 'F', 520, 520, 180]] },
      { en: 'Uh oh, clouds! {name} holds on tight. Rain, rain!', es: '¡Ay, nubes! {name} se agarra fuerte. ¡Lluvia, lluvia!', g: 'water', gy: 820, s: [['nature', 'rain', 300, 470, 240], ['nature', 'rain', 560, 450, 200], ['wheels', 'boat', 425, 760, 260]] },
      { en: 'The sun comes back. What a beautiful day!', es: 'Vuelve a salir el sol. ¡Qué día tan bonito!', g: 'water', gy: 820, s: [['wheels', 'sun', 425, 520, 240], ['wheels', 'sailboat', 600, 720, 200]] },
      { en: '{name} and the {friend} find a tiny island.', es: '{name} y {friend} encuentran una islita.', g: 'water', gy: 840, s: [['ocean', 'rock', 330, 790, 300], ['ocean', 'shell', 330, 700, 80], ['ocean', 'F', 600, 700, 220]] },
      { en: 'Home again. "Thank you for sailing with me, {friend}!"', es: 'De vuelta a casa. "¡Gracias por navegar conmigo!", dice {name}.', g: 'water', gy: 800, s: [['wheels', 'house', 640, 560, 200], ['wheels', 'sailboat', 300, 650, 280], ['ocean', 'F', 470, 880, 140]] }
    ] });
})();
