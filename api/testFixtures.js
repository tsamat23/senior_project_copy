const mongoose = require('mongoose');
const config = require('./config');

const User = require('./models/User');
const Block = require('./models/Block');
const Section = require('./models/Section');
const Question = require('./models/Question');
const Review = require('./models/Review');
const Contact = require('./models/Contacts');
const Answer = require('./models/Answer');
const About = require('./models/About');

// const testDb = 'test-db';
// const devDb = 'psychology-db';


mongoose.connect(`${config.db.url}/${config.db.name}`, { useNewUrlParser: true });

const db = mongoose.connection;

const dropCollection = async (collectionName) => {
    try {
        await db.dropCollection(collectionName);
    } catch (e) {
        console.log(`Collection ${collectionName} did not present, skipping drop...`)
    }
};

const collections = ['users', 'sections', 'blocks', 'questions', 'answers', 'reviews',
    'adminnotifications', 'reviewnotifications', 'usernotifications', 'abouts', 'forbids', 'lastansweredquestionindexes', 'contacts'];

db.once('open', async () => {
    collections.forEach(collectionName => (
        dropCollection(collectionName)
    ));

    const [user, admin] = await User.create({
        email: 'user1@mail.ru',
        displayName: 'Обычный пользователь',
        facebookId: '123',
        vkontakteId: '123',
        password: 'user1',
        role: 'user',
        token: ''
    }, {
        email: 'user123@mail.ru',
        displayName: 'Обычный пользователь2',
        facebookId: '777',
        vkontakteId: '999',
        password: '123',
        role: 'user',
        token: ''
    }, {
        email: 'user2@mail.ru',
        displayName: 'Админ',
        facebookId: '132',
        vkontakteId: '310072015',
        password: 'user2',
        role: 'admin',
        token: ''
    });

    const about = await About.create({
        title: 'О нас',
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ' +
            'magna aliqua. Eu mi bibendum neque egestas congue. Quis auctor elit sed vulputate mi. Sed lectus vestibulum ' +
            'mattis ullamcorper velit sed ullamcorper. Elementum curabitur vitae nunc sed velit dignissim sodales ut. Feugiat ' +
            'vivamus at augue eget arcu. Congue nisi vitae suscipit tellus. Quis vel eros donec ac odio. Habitant morbi tristique ' +
            'senectus et netus et malesuada fames. Ultrices sagittis orci a scelerisque purus semper eget duis. Egestas integer ' +
            'eget aliquet nibh praesent tristique. Et molestie ac feugiat sed lectus vestibulum.'
    });

    const contacts = await Contact.create({
        phone: '0555-55-55-55',
        whatsapp: '0555-55-55-55',
        facebook: 'facebook.com/username',
        instagram: 'instagram.com/username',
        address: 'Какой-то адрес'
    });


    /*============================================================================================================================================================================================================*/


    const block1 = await Block.create({
        title: '1. Работа с компьютером и мобильными устройствами',
        isActive: true,
        image: 'block1picture.jpeg',
        description: 'Умение:\n' +
            '- Работать с тестовыми, графическими и табличными редакторами\n' +
            '- Создавать и работать с файлами и папками (переименовывать, копировать, перемещать, удалять и восстанавливать).\n' +
            '- Подключать внешние периферийные устройства.\n' +
            '- Очищать (архивировать) дисковое пространство.',
        sections: []
    });

    const block2 = await Block.create({
        title: '2. Работа в компьютерных и социальных сетях: поиск, обмен и хранение информации) (Интернет, эл.почта и т.д.)',
        isActive: true,
        image: 'block2picture.jpeg',
        description: 'Умение:\n' +
            '- Получать и отправлять электронные письма.\n' +
            '- Пользоваться поисковыми системами.\n' +
            '- Работать с различными браузерами.\n' +
            '- Корректно взаимодействовать в социальных сетях с учетом этики служащего государственного управления и местного самоуправления.',
        sections: []
    });

    const block3 = await Block.create({
        title: '3. Работа с (большими) данными: обработка и создание новой информации.',
        isActive: true,
        image: 'block3picture.jpeg',
        description: 'Умение: \n' +
            '- Работать с базами данных ввиду высокой скорости изменения информации и разнородности данных.\n' +
            '- Анализировать статистические данные и производить информацию для поддержки эффективности принятия решений.',
        sections: []
    });

    const block4 = await Block.create({
        title: '4. Представление информации и данных',
        isActive: true,
        image: 'block4picture.jpeg',
        description: 'Знания и умения:\n' +
            '- Делать презентации.\n' +
            '- Представлять данные в виде таблиц.\n' +
            '- Работать с числовыми данными, связанными с  вычислениями.\n' +
            '- Представлять данные в виде диаграмм и графиков.',
        sections: []
    });

    const [block5, block6, block7, block8] = await Block.create(
        {
            title: '5. Использование прикладных программных продуктов и сервисов',
            isActive: true,
            image: 'block5picture.jpeg',
            description: 'Умение: \n' +
            '- Пользоваться информационными системами правовой базы законодательства КР.\n' +
            '- Пользоваться приложениями организации веб-конференц-связи. \n' +
            '- Использовать веб-приложения для хранения, доставки и показа видеоматериалов.',
            sections: []
    }, {
        title: '6. Работа с оргтехникой',
            isActive: true,
            image: 'block6picture.jpeg',
            description: 'Умения работать с офисной техникой: \n' +
        '- Копировальными аппаратами.\n' +
        '- Принтером. \n' +
        '- Сканером.\n' +
        '- Проектором или интерактивной доской.\n' +
        '- Факсом.',
            sections: []
    }, {
        title: '7. Государственная политика и нормативно-правовые акты в сфере ИКТ ',
            isActive: true,
            image: 'block7picture.jpeg',
            description: 'Знание основных положений государственной политики по цифровой трансформации и   Законов КР: \n' +
        '- Об электронном управлении.\n' +
        '- Об электронном документе и электронной цифровой подписи.\n' +
        '- Об информации персонального характера.',
            sections: []
    }, {
        title: '8. Информационная безопасность',
            isActive: true,
            image: 'block8picture.jpeg',
            description: 'Умения:\n' +
        '- Использовать антивирусные программы.\n' +
        '- Защищать информационные системы и данные посредством шифрования.\n' +
        '- Устанавливать логин и пароль.\n' +
        '- Соблюдать гигиену информационной безопасности при работе с компьютером.',
            sections: []
    });


    /*============================================================================================================================================================================================================*/


    const [section1, section2, section3, section4, section5, section6, section7, section8,
        section9, section10, section11, section12, section13, section14, section15, section16,
        section17, section18, section19, section20, section21, section22, section23, section24,
        section25, section26, section27, section28, section29
    ] = await Section.create(
        {
            title: '1. Работа с тестовыми, графическими и табличными редакторами',
            isActive: true,
            image: '',
            description: 'Description for section #1',
            questions: []
        },
        {
            title: '2. Работа с файлами и папками',
            isActive: true,
            image: '',
            description: 'Description for section #2',
            questions: []
        },
        {
            title: '3. Внешние периферийные устройства',
            isActive: true,
            image: '',
            description: 'Description for section #3',
            questions: []
        },
        {
            title: '4. Очистка дискового пространства',
            isActive: true,
            image: '',
            description: 'Description for section #4',
            questions: []
        },
        {
            title: '5. Электронная почта',
            isActive: true,
            image: '',
            description: 'Description for section #5',
            questions: []
        },
        {
            title: '6. Поисковые системы',
            isActive: true,
            image: '',
            description: 'Description for section #6',
            questions: []
        },
        {
            title: '7. Работа с браузерами',
            isActive: true,
            image: '',
            description: 'Description for section #7',
            questions: []
        },
        {
            title: '8. Взаимодействие в социальных сетях',
            isActive: true,
            image: '',
            description: 'Description for section #8',
            questions: []
        },
        {
            title: '9. Работа с базами данных',
            isActive: true,
            image: '',
            description: 'Description for section #9',
            questions: []
        },
        {
            title: '10. Работа с числовыми данными',
            isActive: true,
            image: '',
            description: 'Description for section #10',
            questions: []
        },
        {
            title: '11. Работа с презентациями',
            isActive: true,
            image: '',
            description: 'Description for section #11',
            questions: []
        },
        {
            title: '12. Представление данных в табличном виде',
            isActive: true,
            image: '',
            description: 'Description for section #12',
            questions: []
        },
        {
            title: '13. Работа с числовыми данными, вычисления',
            isActive: true,
            image: '',
            description: 'Description for section #13',
            questions: []
        },
        {
            title: '14. Представление данных в виде диаграмм и графиков',
            isActive: true,
            image: '',
            description: 'Description for section #14',
            questions: []
        },
        {
            title: '15. Работа с информационными системами правовой базы.',
            isActive: true,
            image: '',
            description: 'Description for section #15',
            questions: []
        },
        {
            title: '16. Пользование приложениями организации веб-конференц-связи.',
            isActive: true,
            image: '',
            description: 'Description for section #16',
            questions: []
        },
        {
            title: '17. Сервисы для хранения, доставки и показа видеоматериалов',
            isActive: true,
            image: '',
            description: 'Description for section #17',
            questions: []
        },
        {
            title: '18. Умения работать с копировальными аппаратами',
            isActive: true,
            image: '',
            description: 'Description for section #18',
            questions: []
        },
        {
            title: '19. Работа с принтером',
            isActive: true,
            image: '',
            description: 'Description for section #19',
            questions: []
        },
        {
            title: '20. Работа со сканером',
            isActive: true,
            image: '',
            description: 'Description for section #20',
            questions: []
        },
        {
            title: '21. Работа с проектором или интерактивной доской',
            isActive: true,
            image: '',
            description: 'Description for section #21',
            questions: []
        },
        {
            title: '22. Работа с факсом',
            isActive: true,
            image: '',
            description: 'Description for section #22',
            questions: []
        },
        {
            title: '23. Законодательство Кыргызской Республики об электронном управлении',
            isActive: true,
            image: '',
            description: 'Description for section #23',
            questions: []
        },
        {
            title: '24. Законодательство КР об электронном документе цифровой подписи',
            isActive: true,
            image: '',
            description: 'Description for section #24',
            questions: []
        },
        {
            title: '25. Знание об информации персонального характера',
            isActive: true,
            image: '',
            description: 'Description for section #25',
            questions: []
        },
        {
            title: '26. Защита данных, установка логина и пароля',
            isActive: true,
            image: '',
            description: 'Description for section #26',
            questions: []
        },
        {
            title: '27. Использование антивирусных программ',
            isActive: true,
            image: '',
            description: 'Description for section #27',
            questions: []
        },
        {
            title: '28. Гигиена при работе с компьютером',
            isActive: true,
            image: '',
            description: 'Description for section #28',
            questions: []
        },
        {
            title: '29. Безопасность при работе с компьютером',
            isActive: true,
            image: '',
            description: 'Description for section #29',
            questions: []
        }
    );

    const blockOne = await Block.findOne({_id: block1._id});
    blockOne.sections.push(section1._id, section2._id, section3._id, section4._id);
    await blockOne.save();

    const blockTwo = await Block.findOne({_id: block2._id});
    blockTwo.sections.push(section5._id, section6._id, section7._id, section8._id);
    await blockTwo.save();

    const blockThree = await Block.findOne({_id: block3._id});
    blockThree.sections.push(section9._id, section10._id);
    await blockThree.save();

    const blockFour = await Block.findOne({_id: block4._id});
    blockFour.sections.push(section11._id, section12._id, section13._id, section14._id);
    await blockFour.save();

    const blockFive = await Block.findOne({_id: block5._id});
    blockFive.sections.push(section15._id, section16._id, section17._id);
    await blockFive.save();

    const blockSix = await Block.findOne({_id: block6._id});
    blockSix.sections.push(section18._id, section19._id, section20._id, section21._id, section22._id);
    await blockSix.save();

    const blockSeven = await Block.findOne({_id: block7._id});
    blockSeven.sections.push(section23._id, section24._id, section25._id);
    await blockSeven.save();

    const blockEight = await Block.findOne({_id: block8._id});
    blockEight.sections.push(section26._id, section27._id, section28._id, section29._id);
    await blockEight.save();


    /*============================================================================================================================================================================================================*/


    const [section1Question1, section1Question2, section1Question3, section1Question4, section1Question5] = await Question.create({
        title: 'Следующая последовательность действий: «установить указатель мыши на начало текста, нажатие левой кнопки мыши и удержание ее, перемещение мыши вправо» в текстовом редакторе Word приведут к ...',
        type: 'radio',
        data: ['перемещению текста', 'копированию текста в буфер', 'выделению текста', 'удалению текста'],
        importantAnswerVariant: ['выделению текста'],
        sectionId: section1._id
    }, {
        title: 'В текстовом редакторе Word можно производить следующие операции с ячейками таблицы:',
        type: 'checkbox',
        data: ['скрыть ячейки', 'объединить ячейки', 'разбить ячейки', 'показать ячейки'],
        importantAnswerVariant: ['скрыть ячейки', 'объединить ячейки', 'разбить ячейки', 'показать ячейки'],
        sectionId: section1._id
    }, {
        title: 'Данные в электронной таблице могут быть ...',
        type: 'checkbox',
        data: ['текстом', 'числом'],
        importantAnswerVariant: ['текстом', 'числом'],
        sectionId: section1._id
    }, {
        title: 'Как переименовать лист рабочей книги при помощи мыши?',
        type: 'checkbox',
        data: ['сохранить данные на диске',
            'щелкнуть левой кнопкой мыши на листе и ввести новое имя',
            'щелкнуть правой кнопкой мыши на листе и изменить имя',
            'дважды щелкнуть на имени листа и изменить имя',
            'в окне открытой книги один раз кликнуть правой кнопкой мыши на ярлыке нужного листа в контекстном меню выбрать пункт "Переименовать" набрать новое имя листа в соответствии с требованиями к именам листов нажать клавишу Enter на клавиатуре, чтобы закрепить новое имя.'],
        importantAnswerVariant: ['щелкнуть левой кнопкой мыши на листе и ввести новое имя',
            'щелкнуть правой кнопкой мыши на листе и изменить имя',
            'в окне открытой книги один раз кликнуть правой кнопкой мыши на ярлыке нужного листа в контекстном меню выбрать пункт "Переименовать" набрать новое имя листа в соответствии с требованиями к именам листов нажать клавишу Enter на клавиатуре, чтобы закрепить новое имя.'],
        sectionId: section1._id
    }, {
        title: 'Выберите расширения файлов для следующих типов файлов: Файл таблиц Excel; Документ Word; Файл презентаций PowerPoint; База данных Access; Веб-страница; Текстовый файл простого формата (документ); Файл электронного документа, подходит для передачи любой полиграфической продукции и прочего',
        type: 'checkbox',
        data: ['exe', 'doc', 'txt', 'xls', 'bmp', 'accdb', 'html', 'htm', 'php', 'pdf', 'ppt (pptx)'],
        importantAnswerVariant: ['xls', 'doc', 'ppt (pptx)', 'accdb', 'html', 'txt', 'pdf'],
        sectionId: section1._id
    });

    const sectionOne = await Section.findOne({_id: section1._id});
    sectionOne.questions.push(section1Question1._id, section1Question2._id, section1Question3._id, section1Question4._id, section1Question5._id);
    await sectionOne.save();


    const [section2Question1, section2Question2, section2Question3, section2Question4, section2Question5] = await Question.create({
        title: 'Папки (каталоги) образуют ________ структуру',
        type: 'radio',
        data: ['Реляционную', 'Системную', 'Иерархическую'],
        importantAnswerVariant: ['Иерархическую'],
        sectionId: section2._id
    }, {
        title: 'Программы, работающие с дисками компьютера в Windows, находятся в папке ...',
        type: 'radio',
        data: ['Служебные', 'Стандартные', 'Office'],
        importantAnswerVariant: ['Служебные'],
        sectionId: section2._id
    }, {
        title: 'Какие операции можно выполнять с папками и файлами:',
        type: 'checkbox',
        data: ['копировать', 'управлять', 'оформлять', 'удалять', 'создавать', 'переименовывать'],
        importantAnswerVariant: ['копировать', 'управлять', 'оформлять', 'удалять', 'создавать', 'переименовывать'],
        sectionId: section2._id
    }, {
        title: 'Название папки состоит только из имени! Внутри папки может быть:',
        type: 'checkbox',
        data: ['файлы', 'другие папки (вложенные папки)', 'файлы и папки', 'может ничего не находиться (пустая папка)'],
        importantAnswerVariant: ['файлы', 'другие папки (вложенные папки)', 'файлы и папки', 'может ничего не находиться (пустая папка)'],
        sectionId: section2._id
    }, {
        title: 'Как называются данные или программа на магнитном диске?',
        type: 'checkbox',
        data: ['Папка', 'Файл'],
        importantAnswerVariant: ['Папка', 'Файл'],
        sectionId: section2._id
    });

    const sectionTwo = await Section.findOne({_id: section2._id});
    sectionTwo.questions.push(section2Question1._id, section2Question2._id, section2Question3._id, section2Question4._id, section2Question5._id);
    await sectionTwo.save();


    const [section3Question1, section3Question2, section3Question3, section3Question4, section3Question5] = await Question.create({
        title: 'Отметье внешние устройства:',
        type: 'checkbox',
        data: ['принтер', 'дисковод', 'сканер', 'звуковая карта', 'модем', 'WEB - камера', 'CD–ROM', 'DVD-ROM'],
        importantAnswerVariant: [],
        sectionId: section3._id
    }, {
        title: 'Какие устройства служат для ввода данных в компьютер:',
        type: 'checkbox',
        data: ['Сканер', 'Сенсорный Монитор', 'Принтер', 'Мышь', 'Клавиатура'],
        importantAnswerVariant: [],
        sectionId: section3._id
    }, {
        title: 'Какие устройства служат для вывода данных из компьютера:',
        type: 'checkbox',
        data: ['Сканер', 'Монитор', 'Принтер', 'Мышь', 'Клавиатура'],
        importantAnswerVariant: [],
        sectionId: section3._id
    }, {
        title: 'Для нормальной работы компьютеру необходимо:',
        type: 'checkbox',
        data: ['Различные прикладные программы', 'Операционная система', 'Дискета в дисководе'],
        importantAnswerVariant: [],
        sectionId: section3._id
    }, {
        title: 'Клавишное устройство управления компьютером, служащее для ввода алфавитно-цифровых (знаковых) данных, а также команд управления, называется:',
        type: 'radio',
        data: ['Монитор', 'Модем', 'Сканер', 'Мышь', 'Клавиатура'],
        importantAnswerVariant: [],
        sectionId: section3._id
    });

    const sectionThree = await Section.findOne({_id: section3._id});
    sectionThree.questions.push(section3Question1._id, section3Question2._id, section3Question3._id, section3Question4._id, section3Question5._id);
    await sectionThree.save();


    const [section4Question1, section4Question2, section4Question3, section4Question4, section4Question5] = await Question.create({
        title: 'Архивацию применяют для:',
        type: 'radio',
        data: ['экономии дискового пространства', 'уничтожения вирусов', 'создания резервных копий файлов'],
        importantAnswerVariant: [],
        sectionId: section4._id
    }, {
        title: 'Какая из программ является архиватором?',
        type: 'radio',
        data: ['NDD', 'DRWEB', 'RAR'],
        importantAnswerVariant: [],
        sectionId: section4._id
    }, {
        title: 'Чтобы архивировать файл или папку, надо ...',
        type: 'radio',
        data: ['щелкнуть на выбранном объекте правой кнопкой мыши, в контекстном меню выбрать команду “Добавить в архив” – выбрать нужные параметры - нажать ОК',
            'щелкнуть на выбранном объекте левой кнопкой мыши, в Главном меню выбрать команду Выполнить – заполнить нужные параметры - нажать ОК',
            'выделить объект, в меню Файл выбрать команду Добавить в архив – выбрать нужные параметры - нажать ОК',
            'выделить объект, в меню Сервис выбрать команду Добавить в архив – выбрать нужные параметры - нажать ОК',
            'щелкнуть на выбранном объекте правой кнопкой мыши, в контекстном меню выбрать команду Создать ярлык'],
        importantAnswerVariant: [],
        sectionId: section4._id
    }, {
        title: 'Чтобы распаковать архив, надо выполнить команду ...',
        type: 'radio',
        data: ['извлечь', 'достать', 'найти', 'выбрать', 'вставить'],
        importantAnswerVariant: [],
        sectionId: section4._id
    }, {
        title: 'При удалении с компьютера файлов, они лежат в ...',
        type: 'radio',
        data: ['файлы журнала установки', 'временные файлы', 'на облаке', 'корзине'],
        importantAnswerVariant: [],
        sectionId: section4._id
    });

    const sectionFour = await Section.findOne({_id: section4._id});
    sectionFour.questions.push(section4Question1._id, section4Question2._id, section4Question3._id, section4Question4._id, section4Question5._id);
    await sectionFour.save();


    const [section5Question1, section5Question2, section5Question3, section5Question4, section5Question5] = await Question.create({
        title: 'Электронная почта (e-mail) позволяет передавать ...',
        type: 'radio',
        data: ['сообщения и приложенные файлы', 'исключительно текстовые сообщения', 'исполняемые программы', 'www-страницы', 'исключительно базы данных'],
        importantAnswerVariant: [],
        sectionId: section5._id
    }, {
        title: 'Какие действия нужно произвести для регистрации почтового ящика:',
        type: 'checkbox',
        data: ['пройти по ссылке "регистрация в почте"', 'заполнить регистрационную форму', 'зайти на сайт mail.ru', 'войти в сеть Интернет', 'произвести регистрацию электронного ящика'],
        importantAnswerVariant: [],
        sectionId: section5._id
    }, {
        title: 'Что обеспечивает система электронного документооборота?',
        type: 'radio',
        data: ['Перевод документов, созданных рукописным способом, в электронный вид', 'Управление документами, созданными в электронном виде', 'Автоматизацию деятельности компании'],
        importantAnswerVariant: [],
        sectionId: section5._id
    }, {
        title: 'Папка, предназначенная для писем, пришедших на Ваш адрес',
        type: 'radio',
        data: ['входящие', 'корзина', 'отправленные'],
        importantAnswerVariant: [],
        sectionId: section5._id
    }, {
        title: 'Почтовый ящик абонента электронной почты представляет собой:',
        type: 'radio',
        data: ['Участок оперативной памяти почтового сервера, отведенный пользователю',
            'Участок памяти на жестком диске компьютера, отведенный пользователю',
            'Специальное устройство для передачи и хранения корреспонденции в электронной форме'],
        importantAnswerVariant: [],
        sectionId: section5._id
    });

    const sectionFive = await Section.findOne({_id: section5._id});
    sectionFive.questions.push(section5Question1._id, section5Question2._id, section5Question3._id, section5Question4._id, section5Question5._id);
    await sectionFive.save();


    const [section6Question1, section6Question2, section6Question3, section6Question4, section6Question5] = await Question.create({
        title: 'Какая система не является поисковой системой?',
        type: 'checkbox',
        data: ['Яndex', 'Рамблер', 'Апорт', 'Google', 'Altavista', 'Yahoo', 'Search.com ', 'Alybaba'],
        importantAnswerVariant: [],
        sectionId: section6._id
    }, {
        title: 'www.yandex.ru – это',
        type: 'radio',
        data: ['браузер', 'поисковая система', 'домашняя страница'],
        importantAnswerVariant: [],
        sectionId: section6._id
    }, {
        title: 'Одно из правил поиска информации в сети Интернет:',
        type: 'radio',
        data: ['не допускать орфографических ошибок', 'писать большими буквами', 'поиск по одному слову'],
        importantAnswerVariant: [],
        sectionId: section6._id
    }, {
        title: 'В современных поисковых системах есть:',
        type: 'radio',
        data: ['три основных средства поиска', 'пять основных средств поиска', 'два основных средства поиска'],
        importantAnswerVariant: [],
        sectionId: section6._id
    }, {
        title: 'Одним из основных способов поиска информации является:',
        type: 'radio',
        data: ['указание протокола', 'указание расширения поисковой информации', 'указание адреса страницы'],
        importantAnswerVariant: [],
        sectionId: section6._id
    });

    const sectionSix = await Section.findOne({_id: section6._id});
    sectionSix.questions.push(section6Question1._id, section6Question2._id, section6Question3._id, section6Question4._id, section6Question5._id);
    await sectionSix.save();


    const [section7Question1, section7Question2, section7Question3, section7Question4, section7Question5] = await Question.create({
        title: 'Компьютер, подключенный к интернету, обязательно имеет:',
        type: 'checkbox',
        data: ['Связь с удаленным сервером', 'IP-адрес', 'Доменное имя'],
        importantAnswerVariant: [],
        sectionId: section7._id
    }, {
        title: 'Для выхода на поисковый сервер необходимо:',
        type: 'checkbox',
        data: ['Зайти в браузер', 'Ввести запрос в поисковом меню', 'Вписать в адресную строку браузера адрес поискового сервиса'],
        importantAnswerVariant: [],
        sectionId: section7._id
    }, {
        title: 'Выберите по одному примеру для следующих вещей: Браузер, Электронная почта, Поисковый сервер, Всемирная паутина',
        type: 'checkbox',
        data: ['WWW', 'Yandex', 'Amazon', 'Internet Explorer', 'Outlook Express'],
        importantAnswerVariant: [],
        sectionId: section7._id
    }, {
        title: 'Какие браузеры более современные?',
        type: 'checkbox',
        data: ['Google Chrome', 'Mozilla Firefox', 'Internet Explorer', 'Opera', 'Apple Safari'],
        importantAnswerVariant: [],
        sectionId: section7._id
    }, {
        title: 'Каковы основные элементы интерфейса браузера?',
        type: 'radio',
        data: ['Адресная строка для ввода URI', 'Кнопки навигации "Назад" и "Вперед"', 'Закладки', 'Кнопки обновления и остановки загрузки страницы', 'Кнопка "Домой" для перехода на главную страницу', 'Все из них'],
        importantAnswerVariant: [],
        sectionId: section7._id
    });

    const sectionSeven = await Section.findOne({_id: section7._id});
    sectionSeven.questions.push(section7Question1._id, section7Question2._id, section7Question3._id, section7Question4._id, section7Question5._id);
    await sectionSeven.save();


    const [section8Question1, section8Question2, section8Question3, section8Question4, section8Question5] = await Question.create({
        title: 'Государственные служащие в социальных сетях должны быть:',
        type: 'radio',
        data: ['вежливыми', 'доброжелательными', 'корректными', 'внимательными', 'проявлять толерантность в общении с гражданами', 'все выше перечисленные'],
        importantAnswerVariant: [],
        sectionId: section8._id
    }, {
        title: 'Чего нельзя делать в Интернет?',
        type: 'checkbox',
        data: ['употреблять ненормативную лексику', 'разжигать национальную рознь', 'оскорблять людей', 'призывать к свержению существующего строя', 'не стоит присылать свои коммерческие предложения',
            'отправлять инструкции, объясняющие, как совершить незаконные действия, а также спрашивать о возможных способах совершения такого рода действий', 'публиковать личные письма без согласия их авторов'],
        importantAnswerVariant: [],
        sectionId: section8._id
    }, {
        title: 'Можно ли оскорблять других пользователей в сети Интернет?',
        type: 'radio',
        data: ['Да', 'Нет'],
        importantAnswerVariant: [],
        sectionId: section8._id
    }, {
        title: 'Что стоит соблюдать при сетевом этикете электронной почты?',
        type: 'checkbox',
        data: ['обращайтесь к собеседнику персонально (по имени или имени и фамилии)', 'заполняйте поле «Тема», так как адресат оценивает содержимое письма именно по этому полю',
            'отвечайте собеседнику оперативно', 'правильно подавайте информацию в письме', 'не забывайте о блоке контактов (имя, фамилия, должность и контакты)'],
        importantAnswerVariant: [],
        sectionId: section8._id
    }, {
        title: 'Могу ли я написать отрицательные комментарии?',
        type: 'radio',
        data: ['Да', 'Нет'],
        importantAnswerVariant: [],
        sectionId: section8._id
    });

    const sectionEight = await Section.findOne({_id: section8._id});
    sectionEight.questions.push(section8Question1._id, section8Question2._id, section8Question3._id, section8Question4._id, section8Question5._id);
    await sectionEight.save();


    const [section9Question1, section9Question2, section9Question3, section9Question4] = await Question.create({
        title: 'В какой прикладной программе создается база данных?',
        type: 'radio',
        data: ['Microsoft Access', 'Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint'],
        importantAnswerVariant: [],
        sectionId: section9._id
    }, {
        title: 'Над записями базы данных выполняются следующие операции: 1) редактирование, 2) проектирование, 3) сортировка, 4) эксплуатация, 5) индексирование, 6) поиск по ключу',
        type: 'checkbox',
        data: ['1, 3, 5', '1, 2, 3 ,4', '1, 3, 4, 5, 6', '2, 3, 4', '3, 5, 6'],
        importantAnswerVariant: [],
        sectionId: section9._id
    }, {
        title: 'Над полями базы данных можно выполнять следующие операции:\n' +
            '1) описание; 2) составление отчета; 3) редактирование; 4) манипулирование; 5) архивация',
        type: 'radio',
        data: ['1, 2, 3, 4', '1, 3 ,4', '1, 3, 4, 5', '2, 3, 4', '3, 5'],
        importantAnswerVariant: [],
        sectionId: section9._id
    }, {
        title: 'Запуск программы MS Access осуществляется командой',
        type: 'checkbox',
        data: ['Пуск / Microsoft Access', 'Мой компьютер / Microsoft Access',
            'Пуск / Программы / MS Access ', 'Мои документы / Microsoft Access', 'Пуск / Программы / Стандартные / MS Access '],
        importantAnswerVariant: [],
        sectionId: section9._id
    });

    const sectionNine = await Section.findOne({_id: section9._id});
    sectionNine.questions.push(section9Question1._id, section9Question2._id, section9Question3._id, section9Question4._id);
    await sectionNine.save();


    const [section10Question1, section10Question2, section10Question3, section10Question4, section10Question5] = await Question.create({
        title: 'В MS Access в таблице полей, тип данных «Логический» используется для хранения ...',
        type: 'radio',
        data: ['выражений, в которых используются логические связки (And, Or, Not)', 'описаний, которые отображаются в строке состояния',
            'логических данных (Да/Нет)', 'статических данных, относительно базы данных', 'экономических расчётов '],
        importantAnswerVariant: [],
        sectionId: section10._id
    }, {
        title: 'В MS Access в таблице полей, тип данных «Числовой» используется для хранения ...',
        type: 'radio',
        data: ['действительных чисел', 'календарных дат  текущего времени', 'уникальных натуральных чисел с автоматическим наращиванием', 'денежных сумм', 'текущего времени'],
        importantAnswerVariant: [],
        sectionId: section10._id
    }, {
        title: 'В MS Access в таблице полей, тип данных «Денежный» используется для хранения ...',
        type: 'radio',
        data: ['Денежного или финансового формата', 'Действительных чисел', 'Экономических расчётов', 'Денежных сумм', 'Статических данных, относительно базы данных'],
        importantAnswerVariant: [],
        sectionId: section10._id
    }, {
        title: 'В MS Access в таблице полей, тип данных «Дата/Время» используется для хранения ...',
        type: 'radio',
        data: ['действительных чисел', 'уникальных натуральных чисел с автоматическим наращиванием', 'календарных дат и текущего времени', 'денежных сумм', 'ссылок на определённые записи в базе данных'],
        importantAnswerVariant: [],
        sectionId: section10._id
    }, {
        title: 'Укажите специальный тип данных базы данных Microsoft Access, предназначенный для порядковой нумерации записей:',
        type: 'radio',
        data: ['Поле объекта OLE', 'Мастер подстановок', 'Счетчик', 'Дата/время', 'Гиперссылка'],
        importantAnswerVariant: [],
        sectionId: section10._id
    });

    const sectionTen = await Section.findOne({_id: section10._id});
    sectionTen.questions.push(section10Question1._id, section10Question2._id, section10Question3._id, section10Question4._id, section10Question5._id);
    await sectionTen.save();


    const [section11Question1, section11Question2, section11Question3, section11Question4, section11Question5] = await Question.create({
        title: 'Запуск программы Power Point осуществляется с помощью команд ...',
        type: 'radio',
        data: ['Пуск - Программы - Microsoft - Power Point', 'Пуск - Найти - Microsoft Power Point',
            'Панели задач - Настройка - Панель управления - Microsoft Power Point', 'Рабочий стол - Пуск - Microsoft Power Point'],
        importantAnswerVariant: [],
        sectionId: section11._id
    }, {
        title: 'В каком разделе меню окна программы PowerPoint находится команда Создать (Новый) слайд?',
        type: 'radio',
        data: ['Показ слайдов', 'Вид', 'Дизайн', 'Главная'],
        importantAnswerVariant: [],
        sectionId: section11._id
    }, {
        title: 'Выполнение команды Начать показ слайдов презентации программы Power Point осуществляет клавиша ...',
        type: 'radio',
        data: ['F5', 'F4', 'F3', 'F7'],
        importantAnswerVariant: [],
        sectionId: section11._id
    }, {
        title: 'С помощью какой команды или кнопки можно запустить показ слайдов презентации программы Power Point, начиная с текущего слайда?',
        type: 'radio',
        data: ['команда горизонтального меню Показ слайдов - Начать показ', 'кнопка Просмотр', 'кнопка Показ слайдов', 'команда строки меню Показ слайдов - Произвольный показ'],
        importantAnswerVariant: [],
        sectionId: section11._id
    }, {
        title: 'Какая клавиша прерывает показ слайдов презентации программы Power Point?',
        type: 'radio',
        data: ['Enter', 'Del', 'Tab', 'Esc'],
        importantAnswerVariant: [],
        sectionId: section11._id
    });

    const sectionEleven = await Section.findOne({_id: section11._id});
    sectionEleven.questions.push(section11Question1._id, section11Question2._id, section11Question3._id, section11Question4._id, section11Question5._id);
    await sectionEleven.save();


    const [section12Question1, section12Question2, section12Question3, section12Question4, section12Question5] = await Question.create({
        title: 'Если в презентацию вставлена таблица MS Excel, то в ней ...',
        type: 'radio',
        data: ['можно редактировать только числовые данные', 'можно редактировать только текстовые данные',
            'можно редактировать и числовые, и текстовые данные', 'нельзя редактировать данные – таблица вставляется как точечный рисунок'],
        importantAnswerVariant: [],
        sectionId: section12._id
    }, {
        title: 'Можно ли в ЭТ построить график, диаграмму по числовым значениям таблицы?',
        type: 'radio',
        data: ['да', 'нет'],
        importantAnswerVariant: [],
        sectionId: section12._id
    }, {
        title: 'Какие основные типы данных в Excel?',
        type: 'radio',
        data: ['числа, формулы', 'текст, числа, формулы', 'цифры, даты, числа', 'последовательность действий'],
        importantAnswerVariant: [],
        sectionId: section12._id
    }, {
        title: 'Как записывается логическая команда в Excel?',
        type: 'radio',
        data: ['если (условие, действие1, действие 2)', '(если условие, действие1, действие 2)', '=если (условие, действие1, действие 2)', 'если условие, действие1, действие 2'],
        importantAnswerVariant: [],
        sectionId: section12._id
    }, {
        title: 'Какие типы диаграмм позволяют строить табличные процессоры?',
        type: 'radio',
        data: ['График, точечная, линейчатая, гистограмма, круговая', 'Коническая, плоская, поверхностная, усеченная', 'Гистограмма, график, локальное пересечение, аналитическая'],
        importantAnswerVariant: [],
        sectionId: section12._id
    });

    const sectionTwelve = await Section.findOne({_id: section12._id});
    sectionTwelve.questions.push(section12Question1._id, section12Question2._id, section12Question3._id, section12Question4._id, section12Question5._id);
    await sectionTwelve.save();


    const [section13Question1, section13Question2, section13Question3, section13Question4, section13Question5] = await Question.create({
        title: 'Основным элементом электронных таблиц является:',
        type: 'radio',
        data: ['Цифры', 'Ячейки', 'Данные'],
        importantAnswerVariant: [],
        sectionId: section13._id
    }, {
        title: 'Ячейка не может содержать данные в виде ...',
        type: 'radio',
        data: ['текста', 'формулы', 'числа', 'картинки'],
        importantAnswerVariant: [],
        sectionId: section13._id
    }, {
        title: 'Как понимать сообщение # знач! при вычислении формулы?',
        type: 'radio',
        data: ['формула использует несуществующее имя', 'формула ссылается на несуществующую ячейку', 'ошибка при вычислении функции', 'ошибка в числе'],
        importantAnswerVariant: [],
        sectionId: section13._id
    }, {
        title: 'К какой категории относится функция ЕСЛИ?',
        type: 'radio',
        data: ['математической', 'статистической', 'логической', 'календарной'],
        importantAnswerVariant: [],
        sectionId: section13._id
    }, {
        title: 'Как можно задать округление числа в ячейке?',
        type: 'radio',
        data: ['используя формат ячейки', 'используя функцию ОКРУГЛ()', 'оба предыдущее ответа правильные', 'нет правильного ответа'],
        importantAnswerVariant: [],
        sectionId: section13._id
    });

    const sectionThirteen = await Section.findOne({_id: section13._id});
    sectionThirteen.questions.push(section13Question1._id, section13Question2._id, section13Question3._id, section13Question4._id, section13Question5._id);
    await sectionThirteen.save();


    const [section14Question1, section14Question2, section14Question3, section14Question4, section14Question5] = await Question.create({
        title: 'Что не является типовой диаграммой в таблице?',
        type: 'radio',
        data: ['круговая', 'сетка', 'гистограмма', 'график'],
        importantAnswerVariant: [],
        sectionId: section14._id
    }, {
        title: 'B MS Excel для построения графика по данным электронной таблицы следует использовать:',
        type: 'radio',
        data: ['Команду Рисунок меню Вставка', 'Команду Итого меню Данные', 'Команду Зависимость меню Сервис', 'Команду Диаграмма меню Вставка', 'Команду Функция меню Вставка'],
        importantAnswerVariant: [],
        sectionId: section14._id
    }, {
        title: 'В MS Excel мастер диаграмм применяется ...',
        type: 'radio',
        data: ['Для упрощения создания функций', 'Для создания всевозможных графиков и диаграмм', 'Для упрощения форматирования текста в ячейке',
            'Для защиты рабочей книги от несанкционированного доступа', 'Для упрощения ввода функции в ячейку'],
        importantAnswerVariant: [],
        sectionId: section14._id
    }, {
        title: 'Что используется в Excel для наглядного представления числовых данных?',
        type: 'radio',
        data: ['графические объекты Word Art', 'автофигуры', 'графические рисунки', 'диаграммы'],
        importantAnswerVariant: [],
        sectionId: section14._id
    }, {
        title: 'На основании чего строится какой-либо график?',
        type: 'radio',
        data: ['книги Excel', 'графического файла', 'текстового файла', 'данных таблицы'],
        importantAnswerVariant: [],
        sectionId: section14._id
    });

    const sectionFourteen = await Section.findOne({_id: section14._id});
    sectionFourteen.questions.push(section14Question1._id, section14Question2._id, section14Question3._id, section14Question4._id, section14Question5._id);
    await sectionFourteen.save();


    const [section15Question1, section15Question2, section15Question3, section15Question4, section15Question5] = await Question.create({
        title: 'Фактографические информационные системы?',
        type: 'radio',
        data: ['накапливают и хранят', 'обработка текстов на компьютерах с помощью различных текстовых процессоров', 'сравнение текущих показателей с прошлыми показателями'],
        importantAnswerVariant: [],
        sectionId: section15._id
    }, {
        title: 'Классификация информационных систем по уровням управления выделяют:',
        type: 'radio',
        data: ['информационная система специалистов – офисная автоматизация, обработка знаний (включая экспертные системы)',
            'информационные системы тактического уровня (среднее звено) – мониторинг, администрирование, контроль, принятие решений',
            'стратегические информационные системы – формулирование целей, стратегическое планирование'],
        importantAnswerVariant: [],
        sectionId: section15._id
    }, {
        title: 'Типы информационных систем:',
        type: 'radio',
        data: ['Фактографические информационные системы', 'В документальных (документированных) информационных системах',
            'Информационные системы оперативного (операционного) уровня способом выражения ответственности за содержание документа'],
        importantAnswerVariant: [],
        sectionId: section15._id
    }, {
        title: 'К унифицированным системам документации разработаны стандарты требования. Требования стандартов были разработаны для унифицированных систем документации',
        type: 'radio',
        data: ['к унифицированным системам документации', 'к унифицированным формам документов различных уровней управления',
            'к составу и структуре реквизитов и показателей', 'к порядку внедрения, ведения и регистрации унифицированных форм документов'],
        importantAnswerVariant: [],
        sectionId: section15._id
    }, {
        title: 'Главной целью правового обеспечения является',
        type: 'radio',
        data: ['статус информационной системы', 'укрепление законности', 'порядок создания и использования информации'],
        importantAnswerVariant: [],
        sectionId: section15._id
    });

    const sectionFifteen = await Section.findOne({_id: section15._id});
    sectionFifteen.questions.push(section15Question1._id, section15Question2._id, section15Question3._id, section15Question4._id, section15Question5._id);
    await sectionFifteen.save();


    const [section16Question1, section16Question2, section16Question3, section16Question4, section16Question5] = await Question.create({
        title: 'Во многих государственных видеоконференция приносит большие результаты и максимальную эффективность, а именно:',
        type: 'radio',
        data: ['снижает время на переезды и связанные с ними расходы', 'ускоряет процессы принятия решений в чрезвычайных ситуациях',
            'сокращает время рассмотрения дел в судах общей юрисдикции', 'увеличивает производительность труда', 'решает кадровые вопросы и социально-экономические ситуации',
            'даёт возможность принимать более обоснованные решения за счёт привлечения при необходимости дополнительных экспертов',
            'быстро и эффективно распределяет ресурсы', 'Выше все перечисленые'],
        importantAnswerVariant: [],
        sectionId: section16._id
    }, {
        title: 'Для общения в режиме видеоконференции абонент должен иметь',
        type: 'radio',
        data: ['терминальное устройство',
            'терминальное устройство (кодек) видео-конференц-связи',
            'видеотелефон', 'компьютер', 'все выше перечисленные'],
        importantAnswerVariant: [],
        sectionId: section16._id
    }, {
        title: 'В комплекс устройств для видео-конференц-связи входит',
        type: 'radio',
        data: ['кодек с видеокамерой', 'кодек  микрофоном',
            'устройство отображения информации', 'устройство воспроизведения звука', 'все выше перечисленные'],
        importantAnswerVariant: [],
        sectionId: section16._id
    }, {
        title: 'Для подключения к каналам связи используются сетевые протоколы',
        type: 'radio',
        data: ['протоколы IP', 'протоколы ISDN'],
        importantAnswerVariant: [],
        sectionId: section16._id
    }, {
        title: 'Которые из них являются основными правилами видео-конференц-связи:',
        type: 'radio',
        data: ['гарантированная высокоскоростная услуга связи или выделенные каналы связи только для сеансов видеоконференций',
            'стабильное и надёжное электропитание телекоммуникационного оборудования и видео-конференц-связи',
            'оптимальные шумо- и эхо- поглощающие особенности помещения, в котором будет установлено оборудование видео-конференц-связи',
            'правильное расположение оборудования видео-конференц-связи по отношению к световому фону помещения',
            'корректная настройка телекоммуникационного оборудования и видео-конференц-связи по обслуживанию качества услуги связи с приоритизацией передачи данных',
            'компетентный обслуживающий технический персонал',
            'техническое сопровождение и подписка на обновление оборудования через сертифицированного производителем поставщика',
            'все выше перечисленные'],
        importantAnswerVariant: [],
        sectionId: section16._id
    });

    const sectionSixteen = await Section.findOne({_id: section16._id});
    sectionSixteen.questions.push(section16Question1._id, section16Question2._id, section16Question3._id, section16Question4._id, section16Question5._id);
    await sectionSixteen.save();


    const [section17Question1, section17Question2, section17Question3, section17Question4, section17Question5] = await Question.create({
        title: 'Преимущества пользования облачными хранилищами являются',
        type: 'radio',
        data: ['Общая производительность при работе с данными в «облаке»', 'Возможность организации совместной работы с данными',
            'Удалённое облачное хранение данных', 'Снижение затрат на физическое хранение информации'],
        importantAnswerVariant: [],
        sectionId: section17._id
    }, {
        title: 'Ключевые параметры облачного хранилища',
        type: 'radio',
        data: ['Безопасность (протоколы передачи данных, шифрование при хранении)',
            'Общая производительность при работе с данными в «облаке»',
            'Возможность организации совместной работы с данными', 'Удалённое облачное хранение данных',
            'Снижение затрат на физическое хранение информации'],
        importantAnswerVariant: [],
        sectionId: section17._id
    }, {
        title: 'Возможности Google Drive',
        type: 'radio',
        data: ['Просмотр текстовых, табличных и графических файлов, видео, презентаций, PDF, файлов разметки кода, архивов, шрифтов, чертежей', 'Офлайн-доступ к файлам',
            'Встроенные офисные приложения'],
        importantAnswerVariant: [],
        sectionId: section17._id
    }, {
        title: 'Который из них является облачным хранилищем',
        type: 'radio',
        data: ['Dropbox', 'Google Диск', 'Amazon', 'Spaces'],
        importantAnswerVariant: [],
        sectionId: section17._id
    }, {
        title: 'Amazon относятся ли к облачным хранилищам для государственного органа',
        type: 'radio',
        data: ['Да', 'Нет'],
        importantAnswerVariant: [],
        sectionId: section17._id
    });

    const sectionSeventeen = await Section.findOne({_id: section17._id});
    sectionSeventeen.questions.push(section17Question1._id, section17Question2._id, section17Question3._id, section17Question4._id, section17Question5._id);
    await sectionSeventeen.save();


    const [section18Question1, section18Question2, section18Question3, section18Question4] = await Question.create({
        title: 'Аппарат не включается, при включении слышен щелчок, индикации на панели нет, ваши действия:',
        type: 'radio',
        data: ['Выполните инициализацию аппарата: нажав и удерживая нажатыми кнопки «1», «3» и «*», включите питание',
            'Запуск аппарата не завершен, девелопер не был засыпан в блок проявки. В комплект поставки входит черная банка с девелопером, который нужно засыпать в блок обработки',
            'Одновременно нажмите кнопки «СТОП» и «8», на индикаторе появится код ошибки'],
        importantAnswerVariant: [],
        sectionId: section18._id
    }, {
        title: 'Для того, чтобы печатать документы формата А3 на бумагу формата А3 (печать с изменением масштаба НЕ ВЫПОЛНЯЕТСЯ), нужно выполнить следующие настройки:',
        type: 'radio',
        data: ['Настроить кассету аппарата на формат А3 и загрузить бумагу формата А3',
            'Указать, в какой кассете находится формат А3 Свойства принтера/закладка «Параметры устройства»',
            'В драйвере печати в закладке «Бумага/Качество» указать источник бумаги: Автовыбор'],
        importantAnswerVariant: [],
        sectionId: section18._id
    }, {
        title: 'Сообщение "Сканер не готов" при попытке сканирования',
        type: 'radio',
        data: ['В этом случае аппарат следует вывести из режима сна вручную, нажав на кнопку ENERGY SAVER', 'Одновременно нажмите кнопки «СТОП» и «8», на индикаторе появится код ошибки',
            'Выполните инициализацию аппарата: нажав и удерживая нажатыми кнопки «1», «3» и «*», включите питание'],
        importantAnswerVariant: [],
        sectionId: section18._id
    }, {
        title: 'При печати с компьютера аппарат не выходит из режима сна',
        type: 'radio',
        data: ['В этом случае аппарат следует вывести из режима сна вручную, нажав на кнопку ENERGY SAVER',
            'Нажмите кнопку "*" и удерживайте ее не менее 2-х секунд. Отобразится текущая настройка режима сна (SLP- спящий режим, SPS- глубокий сон). Нажмите кнопку "100%" для переключения режима сна. Нажимайте кнопки "25%" (уменьшение) и "200%" (увеличение) для изменения времени перехода в режим сна (от 1 до 240 минут). Нажмите кнопку "СТАРТ"',
            'USER FUNCTIONS -> ОБЩИЕ -> ТАЙМЕРЫ -> СПЯЩИЙ РЕЖИМ'],
        importantAnswerVariant: [],
        sectionId: section18._id
    });

    const sectionEighteen = await Section.findOne({_id: section18._id});
    sectionEighteen.questions.push(section18Question1._id, section18Question2._id, section18Question3._id, section18Question4._id);
    await sectionEighteen.save();


    const [section19Question1, section19Question2, section19Question3, section19Question4, section19Question5] = await Question.create({
        title: 'Как распечатать текст?',
        type: 'radio',
        data: ['Зайти в меню «Файл» и выбрать «Печать»',
            'Настроить кассету аппарата на формат А3 и загрузить бумагу формата А3',
            'Нажмите кнопку "*" и удерживайте ее не менее 2-х секунд. Отобразится текущая настройка режима сна (SLP- спящий режим, SPS- глубокий сон). Нажмите кнопку "100%" для переключения режима сна. Нажимайте кнопки "25%" (уменьшение) и "200%" (увеличение) для изменения времени перехода в режим сна (от 1 до 240 минут). Нажмите кнопку "СТАРТ"'],
        importantAnswerVariant: ['Зайти в меню «Файл» и выбрать «Печать»'],
        sectionId: section19._id
    }, {
        title: 'По количеству выдаваемых цветов:',
        type: 'checkbox',
        data: ['Черно-белые', 'Цветные', 'Литерные принтеры', 'Матричные принтеры'],
        importantAnswerVariant: ['Черно-белые', 'Цветные'],
        sectionId: section19._id
    }, {
        title: 'Которые из них принтер?',
        type: 'radio',
        data: ['Epson l132', 'LG 43LK6200', 'Sony KDL-43WF805', 'Samsung UE32N5300AU'],
        importantAnswerVariant: ['Epson l132'],
        sectionId: section19._id
    }, {
        title: 'Какие чернила используются в принтере для офисного дела',
        type: 'radio',
        data: ['Водные', 'Сольвентные', 'Спиртовые'],
        importantAnswerVariant: ['Водные'],
        sectionId: section19._id
    }, {
        title: 'Беспроводные принтеры используются через',
        type: 'checkbox',
        data: ['по Bluetooth', 'по Wi-Fi', 'через SCSI-интерфейс', 'через последовательный порт (COM)'],
        importantAnswerVariant: ['по Bluetooth', 'по Wi-Fi'],
        sectionId: section19._id
    });

    const sectionNineteen = await Section.findOne({_id: section19._id});
    sectionNineteen.questions.push(section19Question1._id, section19Question2._id, section19Question3._id, section19Question4._id, section19Question5._id);
    await sectionNineteen.save();


    const [section20Question1, section20Question2, section20Question3, section20Question4, section20Question5] = await Question.create({
        title: 'Который из них используется как офисный сканер',
        type: 'radio',
        data: ['Планшетный сканер', 'Рулонный сканер', 'Проекционный сканер'],
        importantAnswerVariant: [],
        sectionId: section20._id
    }, {
        title: 'Как правильно пользоваться сканером?',
        type: 'radio',
        data: ['в сканер кладется лист и накрывается крышкой – происходит сканирование', 'сканер подключить к 220В', 'нажать кнопку включения питания на сканере', 'подключить сканер к компьютеру'],
        importantAnswerVariant: ['в сканер кладется лист и накрывается крышкой – происходит сканирование'],
        sectionId: section20._id
    }, {
        title: 'Почему сканер сканирует не весь документ?',
        type: 'radio',
        data: ['В меню “Пуск” выберите пункт “Все программы”, “Стандартные”, а затем — “Мастер работы со сканером или камерой”. Отобразится окно мастера работы со сканером или камерой',
            'Панель управления → Сканеры и фотокамеры → Производитель сканера → Наименование модели → Далее → Автоматическое определение порта → Задать имя устройства в системе',
            'На странице “Выберите предпочтения сканирования” выберите “Тип изображения”, который наиболее соответствует сканируемому документу, а затем нажмите кнопку “Далее”'],
        importantAnswerVariant: ['Панель управления → Сканеры и фотокамеры → Производитель сканера → Наименование модели → Далее → Автоматическое определение порта → Задать имя устройства в системе'],
        sectionId: section20._id
    }, {
        title: 'Что делает Антивирусный сканер?',
        type: 'radio',
        data: ['Необходимо убедиться в наличии драйвера сканера', 'Сканирует документ', 'Сканирует антивирусы', 'Антивирусный сканер — это уже не устройство, это программа, не имеющая никакого отношения ко всему, что написано выше!'],
        importantAnswerVariant: ['Антивирусный сканер — это уже не устройство, это программа, не имеющая никакого отношения ко всему, что написано выше!'],
        sectionId: section20._id
    }, {
        title: 'Который из них является сканером',
        type: 'checkbox',
        data: ['Epson Perfection V19', 'Bosch KGN39SB10', 'LG GA-B489 YEQZ', 'Samsung RB30J3000WW'],
        importantAnswerVariant: ['Epson Perfection V19'],
        sectionId: section20._id
    });

    const sectionTwenty = await Section.findOne({_id: section20._id});
    sectionTwenty.questions.push(section20Question1._id, section20Question2._id, section20Question3._id, section20Question4._id, section20Question5._id);
    await sectionTwenty.save();


    const [section21Question1, section21Question2, section21Question3, section21Question4, section21Question5] = await Question.create({
        title: 'Через какой проводник подключают проектор к ноутбуку или компьютеру',
        type: 'checkbox',
        data: ['VGA  кабель', 'HDMI кабель'],
        importantAnswerVariant: ['VGA  кабель', 'HDMI кабель'],
        sectionId: section21._id
    }, {
        title: 'Через какой проводник подключают интерактивной доской',
        type: 'radio',
        data: ['USB-кабель', 'HDMI кабель', 'VGA  кабель'],
        importantAnswerVariant: ['USB-кабель'],
        sectionId: section21._id
    }, {
        title: 'Виды проекторов',
        type: 'checkbox',
        data: ['LCD-устройства', 'DLP модели', 'LCoS модели', 'CRT устройства'],
        importantAnswerVariant: ['LCD-устройства', 'DLP модели', 'LCoS модели', 'CRT устройства'],
        sectionId: section21._id
    }, {
        title: 'Виды интерактивной доски',
        type: 'checkbox',
        data: ['Доски с сенсорной аналого-резистивной технологией', 'Доски с электромагнитной технологией', 'Доски с лазерной технологией', 'Доски с ультразвуковой / инфракрасной технологией'],
        importantAnswerVariant: ['Доски с сенсорной аналого-резистивной технологией', 'Доски с электромагнитной технологией', 'Доски с лазерной технологией', 'Доски с ультразвуковой / инфракрасной технологией'],
        sectionId: section21._id
    }, {
        title: 'В чем разница между проектором и интерактивной доской',
        type: 'checkbox',
        data: ['Мобильность во главе угла', 'Скорость работы и точность касаний', 'Программное обеспечение', 'Стоимость проектора и интерактивной доски'],
        importantAnswerVariant: ['Мобильность во главе угла', 'Скорость работы и точность касаний', 'Программное обеспечение', 'Стоимость проектора и интерактивной доски'],
        sectionId: section21._id
    });

    const sectionTwentyOne = await Section.findOne({_id: section21._id});
    sectionTwentyOne.questions.push(section21Question1._id, section21Question2._id, section21Question3._id, section21Question4._id, section21Question5._id);
    await sectionTwentyOne.save();


    const [section22Question1, section22Question2, section22Question3, section22Question4, section22Question5] = await Question.create({
        title: 'К чему нужно подключить факсовый аппарат?',
        type: 'radio',
        data: ['к компьютеру', 'к телефонной линии', 'к розетке', 'к принтеру'],
        importantAnswerVariant: ['к телефонной линии'],
        sectionId: section22._id
    }, {
        title: 'Принимаем факс',
        type: 'radio',
        data: ['Ответили на звонок «Принимаю/стартую», нажали на зеленую кнопку «Fax/Start»', '«Факс-Параметры-Количество звонков»', '«Факс/Старт»'],
        importantAnswerVariant: ['Ответили на звонок «Принимаю/стартую», нажали на зеленую кнопку «Fax/Start»'],
        sectionId: section22._id
    }, {
        title: 'Отправляем факс',
        type: 'checkbox',
        data: ['следует обрадовать, фразой во время звонка, «Примите, пожалуйста, факс». можете смело нажимать кнопку «Факс/Старт»',
            '«Факс-Параметры-Количество звонков»', '«Факс/Старт»', '«Принимаю/стартую», нажали на зеленую кнопку «Fax/Start»'],
        importantAnswerVariant: ['следует обрадовать, фразой во время звонка, «Примите, пожалуйста, факс». можете смело нажимать кнопку «Факс/Старт»'],
        sectionId: section22._id
    }, {
        title: 'Как заправить факс тонером/чернилами?',
        type: 'checkbox',
        data: ['Факс печатает на термобумаге. В таком случае, вероятно, испорчен нагревательный элемент «проявляющий» текст на термобумаге, а ремонта в сервисном центре не избежать',
            'Факс с лазерной печатью (обычно это МФУ с функцией факса). Следует заполнить тонером картридж устройства. Данную операцию можно сделать и самому, но это потребует большой сноровки и опыта работы с подобной техникой. Лучше заправить картридж в сервисном центре',
            'Факс использующий термоперенос. Ресурс термоленты, которая переносит полученное изображение на бумагу, составляет около 250 листов формата А4. Для возобновления печати достаточно купить новый рулон термоленты'],
        importantAnswerVariant: ['Факс с лазерной печатью (обычно это МФУ с функцией факса). Следует заполнить тонером картридж устройства. Данную операцию можно сделать и самому, но это потребует большой сноровки и опыта работы с подобной техникой. Лучше заправить картридж в сервисном центре'],
        sectionId: section22._id
    }, {
        title: 'Как вставить новый рулон термобумаги?',
        type: 'radio',
        data: ['Открываем крышку факса', 'Извлекаем пустой картонный ролик от израсходованного рулона', 'Распаковываем новый рулон: удаляем пластиковую обертку и освобождаем приклеенный край',
            'Кладём рулон в отсек для бумаги, отмотав при этом 15-20 см так, чтобы бумага выступала за пределы отсека', 'Закрываем крышку факса', 'Выше перечиленные'],
        importantAnswerVariant: ['Выше перечиленные'],
        sectionId: section22._id
    });

    const sectionTwentyTwo = await Section.findOne({_id: section22._id});
    sectionTwentyTwo.questions.push(section22Question1._id, section22Question2._id, section22Question3._id, section22Question4._id, section22Question5._id);
    await sectionTwentyTwo.save();


    const [section23Question1, section23Question2, section23Question3, section23Question4, section23Question5] = await Question.create({
        title: 'Как понимается  «электронное управление»?',
        type: 'radio',
        data: ['Электронным управлением в КР понимается деятельность государственных органов, органов местного самоуправления, их должностных лиц, организаций и граждан по принятию юридически значимых решений и совершению юридически значимых действий с использованием электронных документов и иной информации в электронной форме',
            'Действия, направленные на получение информации определенным кругом лиц или передачу информации определенному кругу лиц',
            'Возможность получения информации и ее использования'],
        importantAnswerVariant: ['к телефонной линии'],
        sectionId: section23._id
    }, {
        title: 'К базовым государственным информационным ресурсам относятся:',
        type: 'checkbox',
        data: ['реестры государственных и муниципальных услуг', 'реестр государственной инфраструктуры электронного управления', 'государственный реестр населения',
            'реестр прав на недвижимое имущество', 'реестр транспорта', 'реестр юридических лиц', 'иные государственные информационные ресурсы и реестры'],
        importantAnswerVariant: ['реестры государственных и муниципальных услуг', 'реестр государственной инфраструктуры электронного управления', 'государственный реестр населения',
            'реестр прав на недвижимое имущество', 'реестр транспорта', 'реестр юридических лиц', 'иные государственные информационные ресурсы и реестры'],
        sectionId: section23._id
    }, {
        title: 'В состав государственной инфраструктуры электронного управления входят:',
        type: 'checkbox',
        data: ['государственный портал электронных услуг', 'система межведомственного электронного взаимодействия',
            'единая система идентификации', 'государственные центры обработки данных и соединяющие их каналы связи', 'государственная система электронных сообщений',
            'государственная система электронных платежей', 'базовые государственные информационные ресурсы'],
        importantAnswerVariant: ['государственный портал электронных услуг', 'система межведомственного электронного взаимодействия',
            'единая система идентификации', 'государственные центры обработки данных и соединяющие их каналы связи', 'государственная система электронных сообщений',
            'государственная система электронных платежей', 'базовые государственные информационные ресурсы'],
        sectionId: section23._id
    }, {
        title: 'К конфиденциальной информации относятся сведения:',
        type: 'checkbox',
        data: ['о частной жизни человека', 'о содержании переписки, телефонных и иных переговоров, почтовых, телеграфных, электронных и иных сообщений',
            'составляющие коммерческую тайну', 'о материалах предварительного расследования, иные сведения, доступ к которым ограничивается в соответствии с процессуальным законодательством',
            'составляющие налоговую, банковскую, медицинскую, адвокатскую, журналистскую тайну, тайну усыновления и тайну страхования, иную профессиональную тайну',
            'иные сведения в соответствии с законодательством Кыргызской Республики'],
        importantAnswerVariant: ['о частной жизни человека', 'о содержании переписки, телефонных и иных переговоров, почтовых, телеграфных, электронных и иных сообщений',
            'составляющие коммерческую тайну', 'о материалах предварительного расследования, иные сведения, доступ к которым ограничивается в соответствии с процессуальным законодательством',
            'составляющие налоговую, банковскую, медицинскую, адвокатскую, журналистскую тайну, тайну усыновления и тайну страхования, иную профессиональную тайну',
            'иные сведения в соответствии с законодательством Кыргызской Республики'],
        sectionId: section23._id
    }, {
        title: 'Как вставить новый рулон термобумаги?',
        type: 'radio',
        data: ['Открываем крышку факса', 'Извлекаем пустой картонный ролик от израсходованного рулона', 'Распаковываем новый рулон: удаляем пластиковую обертку и освобождаем приклеенный край',
            'Кладём рулон в отсек для бумаги, отмотав при этом 15-20 см так, чтобы бумага выступала за пределы отсека', 'Закрываем крышку факса', 'Выше перечиленные'],
        importantAnswerVariant: ['Выше перечиленные'],
        sectionId: section23._id
    });

    const sectionTwentyThree = await Section.findOne({_id: section23._id});
    sectionTwentyThree.questions.push(section23Question1._id, section23Question2._id, section23Question3._id, section23Question4._id, section23Question5._id);
    await sectionTwentyThree.save();


    const [section24Question1, section24Question2, section24Question3, section24Question4, section24Question5] = await Question.create({
        title: 'Электронный документ считается подписанным простой электронной подписью при выполнении одного из следующих условий:',
        type: 'checkbox',
        data: ['простая электронная подпись содержится в самом электронном документе',
            'указание ключа простой электронной подписи в соответствии с правилами, установленными оператором информационной системы, с использованием которой осуществляется создание и (или) отправка электронного документа, было необходимым условием создания и (или) отправки электронного документа с использованием такой информационной системы, и в созданном (отправленном) электронном документе содержится информация, однозначно указывающая на лицо, от имени которого был создан (отправлен) электронный документ',
            'При использовании простой электронной подписи не применяются ключ проверки подписи, средства электронной подписи и сертификат ключа проверки подписи'],
        importantAnswerVariant: ['простая электронная подпись содержится в самом электронном документе',
            'указание ключа простой электронной подписи в соответствии с правилами, установленными оператором информационной системы, с использованием которой осуществляется создание и (или) отправка электронного документа, было необходимым условием создания и (или) отправки электронного документа с использованием такой информационной системы, и в созданном (отправленном) электронном документе содержится информация, однозначно указывающая на лицо, от имени которого был создан (отправлен) электронный документ'],
        sectionId: section24._id
    }, {
        title: 'Сфера действия закона КР  «Об электронном документе и электронной цифровой подписи»',
        type: 'radio',
        data: ['Закон определяет порядок электронного управления в Кыргызской Республике',
            'Регулирует отношения по использованию электронных подписей при совершении гражданско-правовых сделок, оказании государственных и муниципальных услуг, исполнении государственных и муниципальных функций, а также при совершении юридически значимых действий',
            'Закон применяется к отношениям по предоставлению государственных и муниципальных услуг в электронной форме, использованию государственной инфраструктуры электронного управления, осуществлению электронного управления в иных областях'],
        importantAnswerVariant: ['Закон применяется к отношениям по предоставлению государственных и муниципальных услуг в электронной форме, использованию государственной инфраструктуры электронного управления, осуществлению электронного управления в иных областях'],
        sectionId: section24._id
    }, {
        title: 'Что  такое электронная подпись?',
        type: 'radio',
        data: ['Совокупность содержащейся в базах данных информации и обеспечивающих ее обработку информационных технологий и технических средств',
            'Электронный документ или документ на бумажном носителе, выданный удостоверяющим центром и подтверждающий принадлежность ключа проверки подписи владельцу сертификата ключа проверки подписи',
            'Информация в электронной форме, которая присоединена к другой информации в электронной форме и (или) логически связана с ней и которая используется для определения лица, от имени которого подписана информация'],
        importantAnswerVariant: ['LCD-устройства', 'DLP модели', 'LCoS модели', 'CRT устройства'],
        sectionId: section24._id
    }, {
        title: 'Какие есть средства электронной подписи?',
        type: 'radio',
        data: ['Шифровальные (криптографические) средства, используемые для реализации хотя бы одной из следующих функций: создание электронной подписи, проверка электронной подписи, создание ключей подписи и ключей проверки подписи',
            'Программные и (или) аппаратные средства, используемые для реализации функций создания, хранения и выдачи сертификатов Ключа проверки подписи, а также ведения реестра сертификатов ключа проверки подписи',
            'информационная система, участниками электронного взаимодействия в которой является определенный круг лиц'],
        importantAnswerVariant: ['Шифровальные (криптографические) средства, используемые для реализации хотя бы одной из следующих функций: создание электронной подписи, проверка электронной подписи, создание ключей подписи и ключей проверки подписи'],
        sectionId: section24._id
    }, {
        title: 'При использовании усиленной электронной подписи участники электронного взаимодействия обязаны:',
        type: 'checkbox',
        data: ['обеспечивать конфиденциальность ключа подписи, в частности, не допускать использование принадлежащих им ключей подписи без их согласия',
            'незамедлительно, но в любом случае в течение не более чем одного рабочего дня с момента получения информации о нарушении конфиденциальности ключа подписи, уведомлять удостоверяющий центр, выдавший сертификат ключа проверки подписи, и иных участников электронного взаимодействия о таком нарушении',
            'при наличии оснований полагать, что конфиденциальность ключа подписи нарушена, не использовать данный ключ',
            'использовать средства электронной подписи, получившие подтверждение соответствия требованиям, установленным в соответствии с настоящим Законом, для осуществления обмена электронными документами, подписанными квалифицированной электронной подписью'],
        importantAnswerVariant: ['обеспечивать конфиденциальность ключа подписи, в частности, не допускать использование принадлежащих им ключей подписи без их согласия',
            'незамедлительно, но в любом случае в течение не более чем одного рабочего дня с момента получения информации о нарушении конфиденциальности ключа подписи, уведомлять удостоверяющий центр, выдавший сертификат ключа проверки подписи, и иных участников электронного взаимодействия о таком нарушении',
            'при наличии оснований полагать, что конфиденциальность ключа подписи нарушена, не использовать данный ключ',
            'использовать средства электронной подписи, получившие подтверждение соответствия требованиям, установленным в соответствии с настоящим Законом, для осуществления обмена электронными документами, подписанными квалифицированной электронной подписью'],
        sectionId: section24._id
    });

    const sectionTwentyFour = await Section.findOne({_id: section24._id});
    sectionTwentyFour.questions.push(section24Question1._id, section24Question2._id, section24Question3._id, section24Question4._id, section24Question5._id);
    await sectionTwentyFour.save();


    const [section25Question1, section25Question2, section25Question3, section25Question4, section25Question5] = await Question.create({
        title: 'Целями настоящего Закона являются:',
        type: 'checkbox',
        data: ['активизация  целенаправленной  государственной  политики в сфере работы с персональными данными',
            'защита  прав и свобод личности при использовании информации персонального характера и защита этой информации',
            'определение  условий работы с информацией персонального характера',
            'определение  порядка формирования массивов информации персонального характера органами государственной власти, органами местного самоуправления, а также юридическими лицами',
            'определение прав и обязанностей субъектов информации  персонального  характера,  держателей (обладателей) и получателей массивов такой информации',
            'установление форм государственного регулирования и порядка работы с информацией персонального характера,  а также условий  обеспечения ее сохранности'],
        importantAnswerVariant: ['активизация  целенаправленной  государственной  политики в сфере работы с персональными данными',
            'защита  прав и свобод личности при использовании информации персонального характера и защита этой информации',
            'определение  условий работы с информацией персонального характера',
            'определение  порядка формирования массивов информации персонального характера органами государственной власти, органами местного самоуправления, а также юридическими лицами',
            'определение прав и обязанностей субъектов информации  персонального  характера,  держателей (обладателей) и получателей массивов такой информации',
            'установление форм государственного регулирования и порядка работы с информацией персонального характера,  а также условий  обеспечения ее сохранности'],
        sectionId: section25._id
    }, {
        title: 'Что такое информация персонального характера ',
        type: 'radio',
        data: ['зафиксированная информация на материальном носителе о конкретном человеке, отождествленная с конкретным человеком или которая может быть отождествлена с конкретным человеком, позволяющая идентифицировать этого человека прямо или косвенно, посредством ссылки на один или несколько факторов, специфичных для его биологической, экономической, культурной, гражданской или социальной идентичности',
            'физическое лицо, к которому относятся соответствующие персональные данные',
            'физическое или юридическое лицо, определяемое держателем (обладателем) персональных данных, которое осуществляет обработку персональных данных на основании заключенного с ним договора'],
        importantAnswerVariant: ['зафиксированная информация на материальном носителе о конкретном человеке, отождествленная с конкретным человеком или которая может быть отождествлена с конкретным человеком, позволяющая идентифицировать этого человека прямо или косвенно, посредством ссылки на один или несколько факторов, специфичных для его биологической, экономической, культурной, гражданской или социальной идентичности'],
        sectionId: section25._id
    }, {
        title: 'Работа с персональными данными может осуществляться держателем (обладателем) массива персональных данных только в случаях:',
        type: 'checkbox',
        data: ['если субъект персональных данных дал свое согласие на ее проведение',
            'если она необходима для выполнения органами государственной власти, органами местного самоуправления своей компетенции, установленной законодательством Кыргызской Республики',
            'если она нужна для достижения законных интересов держателей (обладателей)',
            'когда реализация этих интересов не препятствует осуществлению прав и свобод субъектов персональных данных применительно к обработке персональных данных',
            'когда она необходима для защиты интересов субъекта персональных данных'],
        importantAnswerVariant: ['если субъект персональных данных дал свое согласие на ее проведение',
            'если она необходима для выполнения органами государственной власти, органами местного самоуправления своей компетенции, установленной законодательством Кыргызской Республики',
            'если она нужна для достижения законных интересов держателей (обладателей)',
            'когда реализация этих интересов не препятствует осуществлению прав и свобод субъектов персональных данных применительно к обработке персональных данных',
            'когда она необходима для защиты интересов субъекта персональных данных'],
        sectionId: section25._id
    }, {
        title: 'Режим конфиденциальности персональных данных снимается в случаях:',
        type: 'checkbox',
        data: ['обезличивания персональных данных',
            'по желанию субъекта персональных данных'],
        importantAnswerVariant: ['Факс с лазерной печатью (обычно это МФУ с функцией факса). Следует заполнить тонером картридж устройства. Данную операцию можно сделать и самому, но это потребует большой сноровки и опыта работы с подобной техникой. Лучше заправить картридж в сервисном центре'],
        sectionId: section25._id
    }, {
        title: 'Субъект персональных данных имеет право на получение   от держателя (обладателя) массива   персональных данных информации, касающейся обработки его персональных данных, содержащей:',
        type: 'radio',
        data: ['подтверждение факта обработки персональных данных держателем (обладателем) массива персональных данных',
            'правовые основания и цели обработки персональных данных',
            'цели    и   применяемые   держателем (обладателем) массива персональных данных способы обработки персональных данных',
            'наименование и место нахождения держателя (обладателя) массива персональных данных, сведения о лицах (за исключением работников держателя (обладателя), которые имеют доступ к персональным данным или которым могут быть переданы персональные данные на основании договора с держателем (обладателем) массива персональных данных или на основании закона'],
        importantAnswerVariant: [],
        sectionId: section25._id
    });

    const sectionTwentyFive = await Section.findOne({_id: section25._id});
    sectionTwentyFive.questions.push(section25Question1._id, section25Question2._id, section25Question3._id, section25Question4._id, section25Question5._id);
    await sectionTwentyFive.save();


    const [section26Question1, section26Question2] = await Question.create({
        title: 'Как поставить пароль на Windows 7, Vista, XP',
        type: 'checkbox',
        data: ['Откройте раздел «Пуск» → «Панель управления» → «Учётные записи пользователей». Выберите нужную учётную запись и кликните «Создание пароля» или сразу нажмите «Создание пароля своей учётной записи». Заполните поля с помощью подсказок системы и нажмите на кнопку «Создать пароль»',
            'Во всплывшем окне нажать вкладку «Параметры»; Затем в строке вписать слово «Пароль»; Следующим действием нажать на «Создание пароля»; Внести в нужной строке пароль; Затем повторить ввод; Далее ввести подсказку'],
        importantAnswerVariant: ['Откройте раздел «Пуск» → «Панель управления» → «Учётные записи пользователей». Выберите нужную учётную запись и кликните «Создание пароля» или сразу нажмите «Создание пароля своей учётной записи». Заполните поля с помощью подсказок системы и нажмите на кнопку «Создать пароль»'],
        sectionId: section26._id
    }, {
        title: 'Компьютер принадлежит к рабочей группе, создайте новую учетную запись и ваше действие',
        type: 'radio',
        data: ['Нажмите Управление учетной записью. Требуется разрешение администратора Если отобразится соответствующий запрос, введите пароль администратора или подтвердите действие',
            'Чтобы открыть раздел "Учетные записи пользователей", нажмите кнопку Пуск, выберите Панель управления, а затем последовательно нажмите Учетные записи и Семейная безопасность и Учетные записи пользователей',
            'Введите имя учетной записи пользователя, выберите ее тип, а затем нажмите Создать учетную запись',
            'Выберите пункт Создать новую учетную запись',
            'Все перечисленное'],
        importantAnswerVariant: ['Все перечисленное'],
        sectionId: section26._id
    });

    const sectionTwentySix = await Section.findOne({_id: section26._id});
    sectionTwentySix.questions.push(section26Question1._id, section26Question2._id);
    await sectionTwentySix.save();


    const [section27Question1, section27Question2, section27Question3, section27Question4, section27Question5] = await Question.create({
        title: 'Как можно удалить компьютерный вирус с диска?',
        type: 'radio',
        data: ['Перезагрузить систему', 'Специальной программой', 'Удалить вирус невозможно'],
        importantAnswerVariant: ['Специальной программой'],
        sectionId: section27._id
    }, {
        title: 'Скрытые проявления вирусного заражения:',
        type: 'checkbox',
        data: ['наличие на рабочем столе подозрительных ярлыков',
            'наличие в оперативной памяти подозрительных процессов',
            'наличие на компьютере подозрительных файлов',
            'подозрительная сетевая активность',
            'неожиданно появляющееся всплывающее окно с приглашением посетить некий сайт'],
        importantAnswerVariant: ['наличие в оперативной памяти подозрительных процессов',
            'наличие на компьютере подозрительных файлов'],
        sectionId: section27._id
    }, {
        title: 'Который из них является антивирусом',
        type: 'checkbox',
        data: ['AVG AntiVirus Free', 'Avira Free Security Suite', 'Bitdefender Antivirus Free Edition', 'Comodo Internet Security'],
        importantAnswerVariant: ['AVG AntiVirus Free', 'Avira Free Security Suite', 'Bitdefender Antivirus Free Edition', 'Comodo Internet Security'],
        sectionId: section27._id
    }, {
        title: 'Для защиты от вирусов можно использовать:',
        type: 'checkbox',
        data: ['общие средства защиты информации, которые полезны также и как страховка от физической порчи дисков, неправильно работающих программ или ошибочных действий пользователя',
            'профилактические меры, позволяющие уменьшить вероятность заражения вирусом',
            'специализированные программы для защиты от вирусов'],
        importantAnswerVariant: ['Доски с сенсорной аналого-резистивной технологией', 'Доски с электромагнитной технологией', 'Доски с лазерной технологией', 'Доски с ультразвуковой / инфракрасной технологией'],
        sectionId: section27._id
    }, {
        title: 'Профилактические меры',
        type: 'checkbox',
        data: ['Не использовать сомнительные диски и другие носители информации',
            'Ограничить доступ к файлам программ, устанавливая для них, когда возможно, статус «только для чтения»',
            'При работе в сети, по возможности, не вызывайте программы из памяти других компьютеров',
            'Храните программы и данные в архивах на дисках и в разных подкаталогах жесткого диска',
            'Не копируйте программы для собственных нужд со случайных копий',
            'Обязательно иметь антивирусную программу'],
        importantAnswerVariant: ['Не использовать сомнительные диски и другие носители информации',
            'Ограничить доступ к файлам программ, устанавливая для них, когда возможно, статус «только для чтения»',
            'При работе в сети, по возможности, не вызывайте программы из памяти других компьютеров',
            'Храните программы и данные в архивах на дисках и в разных подкаталогах жесткого диска',
            'Не копируйте программы для собственных нужд со случайных копий',
            'Обязательно иметь антивирусную программу'],
        sectionId: section27._id
    });

    const sectionTwentySeven = await Section.findOne({_id: section27._id});
    sectionTwentySeven.questions.push(section27Question1._id, section27Question2._id, section27Question3._id, section27Question4._id, section27Question5._id);
    await sectionTwentySeven.save();


    const [section28Question1, section28Question2, section28Question3, section28Question4, section28Question5] = await Question.create({
        title: 'Расстояние от экрана монитора до глаз пользователя должно составлять?',
        type: 'radio',
        data: ['50-70см', '20-50см', '70-90см'],
        importantAnswerVariant: ['50-70см'],
        sectionId: section28._id
    }, {
        title: 'Как клавиатура  должна  быть  расположена?',
        type: 'radio',
        data: ['Чтобы  пальцы  рук располагались  на  ней  свободно,  без  напряжения,  а  угол  между  плечом  и  предплечьем составлял 100° -110°',
            'Чтобы  пальцы  рук располагались  на  ней  свободно,  без  напряжения,  а  угол  между  плечом  и  предплечьем составлял 90° -110°',
            'Чтобы  пальцы  рук располагались  на  ней  свободно,  без  напряжения,  а  угол  между  плечом  и  предплечьем составлял 80° -90°'],
        importantAnswerVariant: ['наличие в оперативной памяти подозрительных процессов',
            'наличие на компьютере подозрительных файлов'],
        sectionId: section28._id
    }, {
        title: 'Сколько должен сидеть работник у компьютера?',
        type: 'radio',
        data: ['30 минут', '45 минут – 1,5 часов', '2 часа – 5 часов', '5 часов – 8 часов'],
        importantAnswerVariant: [],
        sectionId: section28._id
    }, {
        title: 'Регулярно проходите _____ осмотр',
        type: 'radio',
        data: ['Врачебный', 'Шиномонтажную', 'Спортивную', 'Логическую'],
        importantAnswerVariant: ['Врачебный'],
        sectionId: section28._id
    }, {
        title: 'Сколько раз надо убирать пыль на рабочем месте',
        type: 'checkbox',
        data: ['1 раз в день', '1 раз в неделю', '1 раз в месяц',],
        importantAnswerVariant: ['1 раз в неделю'],
        sectionId: section28._id
    });

    const sectionTwentyEight = await Section.findOne({_id: section28._id});
    sectionTwentyEight.questions.push(section28Question1._id, section28Question2._id, section28Question3._id, section28Question4._id, section28Question5._id);
    await sectionTwentyEight.save();


    const [section29Question1, section29Question2, section29Question3, section29Question4, section29Question5] = await Question.create({
        title: 'Все питающие кабели и провода должны располагаться с',
        type: 'radio',
        data: ['Задней стороны', 'Передней стороны', 'Боковой стороны'],
        importantAnswerVariant: ['50-70см'],
        sectionId: section29._id
    }, {
        title: 'Запрещается производить какие-либо операции, связанные с __________ компонентов компьютерной системы без предварительного __________',
        type: 'checkbox',
        data: ['подключением',
            'отключением ',
            'перемещением'],
        importantAnswerVariant: ['подключением',
            'отключением ',
            'перемещением'],
        sectionId: section29._id
    }, {
        title: 'Компьютер не следует устанавливать вблизи',
        type: 'checkbox',
        data: ['электронагревательных приборов', 'систем отопления', 'переходников'],
        importantAnswerVariant: ['электронагревательных приборов', 'систем отопления'],
        sectionId: section29._id
    }, {
        title: 'Недопустимо размещать на системном блоке, мониторе и периферийных устройствах посторонние предметы _______. Это приводит к постоянному или временному перекрытию вентиляционных отверстий.',
        type: 'checkbox',
        data: ['книги', 'листы бумаги', 'салфетки', 'чехлы для защиты от пыли'],
        importantAnswerVariant: ['книги', 'листы бумаги', 'салфетки', 'чехлы для защиты от пыли'],
        sectionId: section29._id
    }, {
        title: 'Запрещается внедрять посторонние предметы в',
        type: 'checkbox',
        data: ['эксплуатационные отверстия', 'вентиляционные отверстия'],
        importantAnswerVariant: ['эксплуатационные отверстия', 'вентиляционные отверстия'],
        sectionId: section29._id
    });

    const sectionTwentyNine = await Section.findOne({_id: section29._id});
    sectionTwentyNine.questions.push(section29Question1._id, section29Question2._id, section29Question3._id, section29Question4._id, section29Question5._id);
    await sectionTwentyNine.save();


    /*============================================================================================================================================================================================================*/

    db.close();
})
;