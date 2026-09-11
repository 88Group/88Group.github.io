const e = { ru: {
  base: {
    h: "ч",
    min: "мин",
    d: "д",
    m: "м",
    days: [
      "Пн",
      "Вт",
      "Ср",
      "Чт",
      "Пт",
      "Сб",
      "Вс"
    ],
    long_days: [
      "понедельник",
      "вторник",
      "среда",
      "четверг",
      "пятница",
      "суббота",
      "воскресенье"
    ],
    long_months: [
      "",
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря"
    ],
    short_days: [
      "пн",
      "вт",
      "ср",
      "чт",
      "пт",
      "сб",
      "вс"
    ],
    short_months: [
      "",
      "янв",
      "фев",
      "мар",
      "апр",
      "май",
      "июн",
      "июл",
      "авг",
      "сен",
      "окт",
      "ноя",
      "дек"
    ]
  },
  agencies: {
    agencies: "Агентства",
    agency_name: "Название агентства"
  },
  airportchangelayovermodal: {
    expect_transfer_costs_airports: "вас ждут затраты на проезд между аэропортами;",
    itaposs_not_difficult_but_there_are_things_consider: "Это не сложно, но есть нюансы:",
    layover_airport_change: "Пересадка со сменой аэропорта %{nameWhere}",
    there_is_a_risk_getting_stuck_traffic_and: "есть риск застрять в пробке и не успеть на свой рейс.",
    you_will_have_collect_and_recheck_your_baggage: "придётся получать и сдавать багаж;"
  },
  airportsin: {
    airports: "Аэропорты %{cityNameWhere}",
    departure_and_arrival_the_same_airport: "Вылет и прилёт в тот же аэропорт"
  },
  alliances: {
    alliances: "Альянсы",
    alliances_and_airlines: "Альянсы и авиакомпании",
    flights_operated_by_a_single_airline: "Только одна авиакомпания в билете",
    no_lowcost_airlines: "Без лоукостеров"
  },
  baggagefilter: { no_repeat_checkin: "Без повторной регистрации" },
  changeflightclassmodal: {
    but_we_have_economy_one: "Но у нас есть эконом-класс.",
    if_you_want_you_can_try_searching_them: "Можете поискать их, если хотите",
    no_business_tickets_found: "Не получилось найти билеты бизнес-класса",
    search_economy_class: "Искать в экономклассе"
  },
  convenience: {
    convenience: "Удобство пересадок",
    no_airport_changes: "Без смены аэропорта",
    no_layovers_requiring_visas: "Без пересадок с визой",
    no_overnight_layovers: "Без ночных пересадок"
  },
  defaultsearch: {
    search_flights: "Найти билеты",
    searching_at_providers: "Ищем у поставщиков"
  },
  directflights: { direct_flights: "Прямые рейсы" },
  exchangeablefreeforchargemodal: {
    exchangeable_free_charge: "Обмен без сборов авиакомпании",
    if_youre_booking_an_agency_they_might_charge: "Если вы покупаете через агентство, оно может взять комиссию при обмене — вдобавок ко сбору авиакомпании.",
    its_often_the_case_that_the_earlier_you: "Лучше обращаться за обменом пораньше, так может быть дешевле.",
    its_when_you_can_exchange_your_ticket_but: `Это значит, что вы можете обменять билет на другой, 
но за это придётся доплатить — не прямо сейчас, а когда соберётесь менять.`,
    you_can_find_out_the_additional_fee_amount: "Сумму доплаты можно узнать на сайте продавца при покупке билета или позже.",
    you_can_only_exchange_your_ticket_via_the: "Обменять билет можно только через продавца, но наша поддержка всегда готова прийти на помощь, если у вас возникнут проблемы."
  },
  faremodal: {
    fares: "Тарифы",
    no_fares_found_matching_these_criteria: "Предложения с такими условиями не нашлись"
  },
  flightcard: {
    with_baggage: "С багажом",
    baggage_included: "Багаж включён",
    ticket: "билет",
    only_seats_remaining_for: "Осталось %{count} билетов <br /> по этой цене"
  },
  flighthead: {
    travel_time: "%{time} в пути",
    in_flight: "%{time} в полёте"
  },
  flightmatrix: {
    baggage_included: "Багаж включён",
    changeable: "С обменом",
    refundable: "С возвратом",
    large_carry_allowance: "С большой ручной кладью",
    baggage_not_included: "Без багажа",
    only_direct_flights: "Только прямые рейсы",
    checked_baggage_can_be_added: "Багаж можно добавить потом. Например, при оформлении билета или регистрации на рейс",
    price_grid: "Таблица цен",
    select_a_flight: "Выберите рейс",
    no_layovers: "Без пересадок",
    carry_on: "Ручная кладь %{count}×%{weight} кг",
    baggage_kg: "Багаж %{count}x%{weight} кг",
    personal_item: "Личная вещь",
    exchangeable: "С обменом",
    exchangeable_for_fee: "Обмен платный",
    non_exchangeable: "Без обмена",
    non_refundable: "Не возмещается",
    partially_refundable: "Возврат платный",
    checked_baggage_paid: "Багаж оплачивается отдельно",
    non_refundable_tooltip: `Вернуть билет можно только в крайних случаях,
например, при отмене рейса. Выберите другой тариф,
если такие условия вам не подходят
`,
    you_can_add_baggage_later: "Багаж можно добавить потом. Например, при оформлении билета или регистрации на рейс",
    show: "Показать"
  },
  flightschedule: {
    same_price: "Та же цена",
    selected: "Выбрано",
    select: "Выбрать",
    unavailable: "Недоступно"
  },
  itineraryflight: { operated_by: "Выполняет %{operatingCarrier}" },
  layoverduration: { layover_duration: "Длительность пересадок" },
  layovers: {
    layovers: "Пересадки",
    count_layovers: {
      one: "%{count} пересадка",
      two: "%{count} пересадки",
      few: "%{count} пересадки",
      many: "%{count} пересадок",
      other: "%{count} пересадок"
    }
  },
  multiroutesearch: {
    search_flights: "Найти билеты",
    you_have_added_the_maximum_flights: "Вы добавили максимальное количество перелётов",
    the_maximum_numbers_of_flights_we_support: "Максимальное количество поддерживаемых рейсов"
  },
  noconnectionmodal: {
    check_the_connection_and_try_if_you_have: "Проверьте подключение и попробуйте ещё раз. Если под рукой другое устройство с мобильным интернетом, попробуйте открыть сайт на нём",
    the_connection_has_disappeared_were_sure_this_is: "Пропал интернет. Уверены, это временно"
  },
  noflightsmodal: {
    no_flights_found: "Билеты не нашлись",
    the_reasons_could_be: "Это могло произойти из-за следующих причин:",
    there_are_no_flights_this_airport: "В этот аэропорт не летают самолёты.",
    your_dates_are_too_distant_check_the_year: "Слишком поздние даты. Проверьте год вылета или прилёта."
  },
  overnightlayovermodal: {
    overnight_layover: "Ночная пересадка %{nameWhere}",
    you_will_have_spend_money_a_hotel_or: "Придётся тратить деньги на отель или спать на лавочке. К тому же некоторые аэропорты закрываются на ночь."
  },
  partiallyrefundablemodal: {
    if_youre_booking_an_agency_they_might_charge: "Если покупаете через агентство, оно может удержать комиссию при возврате — вдобавок к сбору авиакомпании.",
    its_often_the_case_that_the_earlier_you: "Лучше обращаться за возвратом пораньше, так может быть дешевле.",
    its_when_you_can_get_your_ticket_refunded: "Это значит, что вы сможете вернуть деньги за билет, но с вас удержат комиссию.",
    only_the_seller_can_refund_your_ticket_however: "Вернуть билет можно только через продавца, но наша поддержка всегда готова прийти на помощь, если у вас возникнут проблемы.",
    partial_refunds_what_are_they: "Что такое платный возврат",
    you_can_find_out_the_additional_fee_amount: "Сумму доплаты можно узнать на сайте продавца при покупке билета или позже"
  },
  passengerspicker: {
    years_and_older: "12 лет и старше",
    years_old: "2–11 лет",
    under_2_y_o: "Младше 2 лет, без места"
  },
  passengerspickercontent: { number_passengers: "Количество пассажиров" },
  placepicker: {
    cities_and_airports: "города и аэропорты",
    countries: "страны"
  },
  popoveradditionalcontent: { i_dont_need_a_return_ticket: "Обратный билет не нужен" },
  popular: { popular_filters: "Популярные фильтры" },
  pricefilter: { total: "Всего" },
  repeatcheckinmodal: {
    if_quarantine_is_required_upon_arrival_the_country: "если по прибытии в страну обязателен карантин, лучше выяснить, возможен ли трансфер;",
    if_the_country_is_closed_tourists_you_may: "если в страну пересадки не пускают туристов, вы можете не попасть на следующий рейс;",
    repeat_checkin: "Повторная регистрация",
    the_exchange_and_refund_terms_each_ticket_are: "правила обмена и возврата для каждого билета скорее всего отличаются.",
    the_layover_will_involve_entering_the_country_if: "пересадка равноценна въезду в страну — если нужна виза, её потребуют на паспортном контроле;",
    ticket_consists_several_separate_bookings_this_option_is: "Билет состоит из нескольких отдельных бронирований. Иногда такой вариант дешевле, но есть нюансы:",
    youaposll_need_check_the_next_flight_the_connecting: "на следующий рейс нужно регистрироваться в аэропорту пересадки, а если летите с багажом, придётся его забрать и снова сдать;"
  },
  searchedit: { create_multicity_route: "Составить сложный маршрут" },
  shortlayovermodal: {
    short_layover: "Короткая пересадка %{nameWhere}",
    your_baggage_may_not_get_transferred_time_and: "ваш багаж может не успеть «пересесть» вместе с вами и прилететь позже;",
    your_may_not_be_time_the_next_flight: "вы можете не успеть на следующий рейс, если предыдущий задержится.",
    you_will_have_to_hurry: "Только %{layoverTime} – вам придется поторопиться. Какие риски вас ждут:"
  },
  skeletonticketproposals: { loading_prices: "Загружаем цены..." },
  strictfiltersmodal: {
    filters_are_too_strict: "Слишком жёсткие фильтры",
    we_found_tickets_but_none_them_meet_the: "Мы нашли %{totalTicketsCount} билетов, но ни один из них не соответствует условиям",
    adjust_the_filters: "Расслабить фильтры"
  },
  ticketalerts: {
    repeat_checkin_layover: "Повторная регистрация на пересадке — изучите нюансы",
    ticket_incudes_charter_flights: "В билете есть чартерный рейс"
  },
  ticketswidget: {
    soft_tickets_notice: "No tickets matching your parameters. We removed some filters and found a few available options that may be of interest",
    prices_may_be_outdated: "Цены могли устареть"
  },
  traveltime: {
    up_to: "До %{time} ч.",
    total: "Общая длительность перелёта",
    from_to: "С %{timeFrom}ч до %{timeTo}ч"
  },
  updatemodal: {
    later: "Позже",
    search_results_may_be_outdated: "Результаты могли устареть",
    ticket_prices_change_several_times_a_day_update: "Цены на билеты меняются около 10 раз в день. Обновите поиск, чтобы увидеть точные цены"
  },
  flightfilters: { prices_for_nearby_dates: "Цены на соседние даты" },
  inputs: {
    selectall: "Выбрать все",
    select: "Выбрать",
    must_be_filled: "Обязательно для заполнения",
    share: "Поделиться",
    link_copied: "Ссылка скопирована",
    show_more_options: "Показать еще варианты",
    select_different_cities: "Выберите разные города",
    required: "Обязательно для заполнения"
  },
  airports_precheck: {
    discription: "Нашли билеты дешевле",
    discription_from: "из соседнего аэропорта в городе вылета",
    discription_near: "в тех же городах вылета и прилета, но в других аэропортах",
    discription_to: "в соседний аэропорт города прилета",
    flying: "вылетая",
    flying_from: "из",
    flying_near: "из ближайших аэропортов",
    flying_to: "в",
    save: "Сэкономьте",
    show_and_save: "Показать",
    test: "тест"
  },
  best_tickets: {
    best: "Лучший",
    fastest: "Самый быстрый",
    header: "Подобрали для вас самые лучшие билеты",
    price: "Лучшая цена",
    rating: "Оптимальный"
  },
  calendar: {
    button: "Календарь низких цен",
    close: "Закрыть",
    depart_title: "Туда",
    description: "Ориентировочные цены на перелёт одного взрослого, найденные за последние 48 часов",
    direct_only: "Только прямые рейсы",
    return_title: "Обратно",
    toggle: "Посмотреть календарь"
  },
  card: {
    all_deals: "Все предложения:",
    all_rooms_and_prices: "Все номера и цены",
    all_variants: "Все номера",
    badges: {
      adults_only: "Только для взрослых",
      boutique: "Бутик",
      business: "Бизнес",
      comfort: "Комфорт",
      designer: "Дизайнерский",
      "eco-friendly": "Экологичный",
      family: "Семейный",
      friendly: "Дружественный",
      luxury: "Люкс",
      modern: "Современный",
      party: "Вечеринка",
      romantic: "Романтика",
      special: {
        discount: "Скидка",
        new: "Новый",
        popular: "Популярный",
        rare: "Редкий",
        top: "Лучший по отзывам",
        trending: "В тренде"
      },
      stylish: "Стильный"
    },
    book: "Забронировать",
    breakfast: "Завтрак",
    checkboxes: {
      less: "Свернуть",
      more: "Ещё варианты"
    },
    choose_different_dates: "Выбрать другие даты",
    discount: "Скидка",
    filtering: {
      description: "Более 800 000 отелей",
      title: "Обновляем данные"
    },
    good: "Хорошо",
    loader_text: "Ищем свободные номера…",
    main_proposal: {
      for: "Цена за",
      from: "от",
      tax_included: "включая налоги и сборы"
    },
    more_proposals: "Все номера",
    nights: {
      one: "ночь",
      few: "ночи",
      many: "ночей",
      other: "ночей"
    },
    no_rooms: "Нет свободных комнат",
    no_rooms_available: "Распродано",
    no_rooms_note: "на эти даты",
    on: "на",
    pick_room: "Бронировать",
    rating: {
      excellent: "Превосходно",
      exceptional: "Превосходно",
      fair: "Посредственно",
      good: "Хорошо",
      score: "Рейтинг",
      very_good: "Очень хорошо",
      wonderful: "Отлично"
    },
    rooms_left: {
      one: "Остался %{count} номер за эту цену!",
      few: "Осталось %{count} номера за эту цену!",
      many: "Осталось %{count} номеров за эту цену!",
      other: "Осталось %{count} номеров за эту цену!"
    },
    search_title: {
      objects: {
        one: "объект",
        few: "объекта",
        many: "объектов",
        other: "объектов"
      },
      searching: "Ищем свободные номера…",
      show: "Показано"
    },
    searching_cheaper: "Ищем дешевле...",
    sold_out: "Распродано!",
    sold_out_note: "Вы не успели",
    special: { discount: "Скидка" },
    to_beach: "пляж",
    to_city_center: "расстояние до центра",
    to_elevator: "лифт",
    to_metro: "метро",
    view_all_rooms: "Посмотреть все доступные номера"
  },
  currencies: {
    AED: "Арабский дирхам",
    ALL: "Албанский лек",
    AMD: "Армянский драм",
    ARS: "Аргентинское песо",
    AUD: "Австралийский доллар",
    AZN: "Азербайджанский манат",
    BAM: "Конвертируемая марка Боснии и Герцеговины",
    BDT: "Бангладешская така",
    BGN: "Болгарский лев",
    BHD: "Бахрейнский динар",
    BRL: "Бразильский реал",
    BYN: "Белорусский рубль",
    CAD: "Канадский доллар",
    CHF: "Швейцарский франк",
    CLP: "Чилийское песо",
    CNY: "Юань",
    COP: "Колумбийское песо",
    CZK: "Чешская крона",
    DKK: "Датская крона",
    DZD: "Алжирский динар",
    EGP: "Египетский фунт",
    EUR: "Евро",
    GBP: "Фунт стерлингов",
    GEL: "Грузинский лари",
    GHS: "Ганский седи",
    HKD: "Гонконгский доллар",
    HRK: "Хорватская куна",
    HTG: "Гаитянский гурд",
    HUF: "Венгерский форинт",
    IDR: "Индонезийская рупия",
    ILS: "Шекель",
    INR: "Индийская рупия",
    IQD: "Иракский динар",
    IRR: "Иранский риал",
    ISK: "Исландская крона",
    JOD: "Иорданский динар",
    JPY: "Иена",
    KES: "Кенийский шиллинг",
    KGS: "Киргизский сом",
    KRW: "Южнокорейская вона",
    KWD: "Кувейтский динар",
    KZT: "Казахстанский тенге",
    LKR: "Шри-ланкийская рупия",
    LYD: "Ливийский динар",
    MNT: "Монгольский тугрик",
    MUR: "Маврикийская рупия",
    MXN: "Мексиканское песо",
    MYR: "Малайзийский ринггит",
    MZN: "Мозамбикский метикал",
    NGN: "Нигерийский найра",
    NOK: "Норвежская крона",
    NPR: "Непальская рупия",
    NZD: "Новозеландский доллар",
    OMR: "Оманский риал",
    PEN: "Перуанский соль",
    PHP: "Филиппинское песо",
    PKR: "Пакистанская рупия",
    PLN: "Польский злотый",
    QAR: "Катарский риал",
    RON: "Румынский лей",
    RSD: "Сербский динар",
    RUB: "Российский рубль",
    SAR: "Саудовский риял",
    SEK: "Шведская крона",
    SGD: "Сингапурский доллар",
    THB: "Тайский бат",
    TJS: "Таджикский сомони",
    TND: "Тунисский динар",
    TRY: "Турецкая лира",
    TWD: "Тайваньский доллар (новый)",
    UAH: "Украинская гривна",
    USD: "Доллар США",
    UZS: "Узбекский сум",
    VND: "Вьетнамский донг",
    XOF: "Франк КФА",
    ZAR: "Южноафриканский рэнд"
  },
  durations: [
    "ч",
    "м",
    "д"
  ],
  errors: {
    bad_search_params: {
      description: "Введённые вами параметры поиска некорректны.</br>Пожалуйста, измените их и запустите новый поиск.",
      message: "Упс, что-то пошло не так :-("
    },
    check_out_days: {
      description: "Введённые вами параметры поиска некорректны.</br>Пожалуйста, измените их и запустите новый поиск.",
      message: "К сожалению, бронирование более чем на 30 ночей невозможно."
    },
    empty_tickets: {
      description: "Мы не смогли найти билеты, соответствующие вашему запросу.</br>Пожалуйста, попробуйте еще раз — возможно, с другими датами или аэропортами.",
      message: "Упс, что-то пошло не так :-("
    },
    filtered_all_hotels: {
      additional_description: 'Попробуйте изменить фильтры, чтобы увидеть больше результатов. <div class="preroll-hotel_trigger"><span role="reset_filters">Сбросить фильтры</span></div>',
      description: "Не найдено подходящих предложений"
    },
    filtered_all_tickets: {
      additional_description: 'Нажмите <div class="preroll-trigger" role="reset_filters"><span>Сбросить фильтры</span></div>, чтобы увидеть все билеты, которые мы нашли.',
      description: "Ни один из найденных билетов не отвечает вашим настройкам фильтров."
    },
    google_recaptcha: { message: "Извините, нам нужно убедиться, что вы не робот" },
    search_failed: {
      description: "Мы уже знаем о проблеме и занимаемся её решением.",
      message: "Упс, что-то пошло не так :-("
    },
    wrong_dates: {
      description: "Введённые вами даты перелёта некорректны.</br>Мы можем искать рейсы только на год вперёд. Пожалуйста, скорректируйте даты и запустите новый поиск.",
      message: "Упс, что-то пошло не так :-("
    }
  },
  filters: {
    airlines: "Авиакомпании",
    airports: { title: "Аэропорты" },
    any: "Любой",
    any_distance: "Любое расстояние",
    any_price: "Любая цена",
    arrive: "Куда",
    baggage: "Багаж",
    baggage_no: "Без багажа",
    baggage_yes: "Багаж и ручная кладь",
    clear_all: 'Сбросить<span class="relax_long"> фильтры</span>',
    counter: { flights: `<span class="tickets_long_label">Показано </span>билетов: <span class='tickets_counter'>%{count}&thinsp;/&thinsp;%{total}</span>` },
    departure_from: "Откуда",
    departure_to: "Отправление в",
    return_to: "Возвращение в",
    departure: "Вылет",
    return: "Назад",
    arrival: "Прибытие",
    arrival_date: "Дата прибытия",
    distance: "Расстояние от центра",
    distance_from_point: "Расстояние от точки поиска",
    districts: "Районы",
    duration_of_flight: "Время в пути",
    duration_of_stop: "Длительность пересадок",
    gates: "Агентства",
    header: "Фильтры",
    hotel_facilities: "Удобства в отеле",
    hotels: "отели",
    km: "км",
    labels: {
      all: "Все",
      only: "Только"
    },
    m: "м",
    no_stars: "Без звёзд",
    number_of_stops: "Количество пересадок",
    price: "Цены на авиабилеты",
    price_title: "Цена за ночь",
    property_types: "Тип размещения",
    proposals_options: "Опции номера",
    ratings: "Оценка гостей",
    reset: "Сбросить",
    room_facilities: "Удобства в номере",
    select_segment: "Выберите сегмент",
    sorting: "Сортировка результатов",
    stars: "Звёзды",
    stops_airports: "Аэропорты пересадок",
    stops_name: {
      few: "%{count} пересадки",
      one: "%{count} пересадка",
      other: "%{count} пересадок"
    },
    stops_zero: "Без пересадок",
    time_filters_title: "Время вылетов/прилётов",
    time_prepositions: {
      from: "от",
      to: "до"
    },
    title: "Фильтры",
    loading_filters: "Загружаем фильтры",
    update_search: "Обновить поиск",
    flight_departs: "Вылет из %{airport} (%{city}) в %{time} по местному времени",
    flight_arrives: "Прилёт в %{airport} (%{city}) в %{time} по местному времени",
    we_applied_filters_from_your_previous_search: "Мы применяли фильтры из предыдущего поиска. Вы можете редактировать или сбросить их",
    we_cleared_filters_from_your_previous_search: "Мы удалили фильтры из предыдущего поиска",
    reset_filters: "Сбросить фильтры",
    okay: "Понятно",
    aircraft_types: "Модели самолётов"
  },
  form: {
    passengers: {
      few: "",
      many: "",
      one: "%{count} пассажир",
      other: "%{count} пассажиров",
      two: "",
      zero: ""
    },
    trip_class: {
      C: "бизнес-класс",
      Y: "экономкласс"
    }
  },
  from: "Откуда",
  gallery: { from: "из" },
  gdpr: {
    cookies_policy: "Мы сохраняем информацию о ваших последних поисках и настройках фильтров в cookies, чтобы сделать использование сервиса более удобным. Продолжая пользоваться сайтом, вы даёте согласие на хранение данной информации.",
    cookies_policy_link: 'Подробнее: <a href="/cookie/">Политика cookie</a>.'
  },
  google_csa_query: "авиабилеты в %{destination_city}",
  helpers: { submit: { search: { update: "Изменить" } } },
  highlighted_ticket: {
    all_right: "Ваш билет! (Цена не изменилась)",
    please_wait: "Пожалуйста, подождите. Мы ищем цену вашего билета…",
    price_better: 'Стоимость этого билета уже успела понизиться на <span class="currency_font currency_font--%{currency}">%{price}</span>',
    price_worse: 'Стоимость этого билета уже успела повыситься на <span class="currency_font currency_font--%{currency}">%{price}</span>',
    sold_out: "К сожалению, этот билет раскупили"
  },
  hotel_header: {
    in: "в",
    rating: "Оценка",
    to_main_page: "Главная",
    to_search_results: "К результатам поиска"
  },
  hotel_page: {
    advantages: {
      fold: "Свернуть",
      hotel: {
        about: "Об отеле",
        advantages: "О жилье",
        build_in: "Построен в",
        check_in: "Заезд",
        check_out: "Выезд",
        hotel: "Отель",
        language: "язык",
        renovated: "Обновлён в",
        rooms: "комнат",
        staff_speak_on: "Персонал говорит на языках:",
        year: "году"
      },
      hotel_facilities: "Услуги отеля",
      room_facilities: "Удобства в номере",
      unfold: "Показать все"
    },
    all_reviews: "Все отзывы",
    all_rooms: "Все номера",
    available_rooms: "Все номера",
    available_rooms_on: "Доступные номера на",
    available_rooms_select_dates: "Выбрать другие даты",
    available_rooms_tooltip_text: "Сравниваем отели на крупнейших сервисах по бронированию отелей",
    best_proposal_title: "Лучшее предложение",
    book_now: "Бронировать",
    booking_verification: {
      by: "Предоставлено",
      real: "Настоящие гости. Настоящие поездки. Настоящие мнения.",
      reviews: "На 100% подлинные отзывы"
    },
    collapse_rooms: "Свернуть",
    deals: {
      few: "",
      many: "",
      one: "%{count} предложение",
      other: "%{count} предложений",
      two: "",
      zero: "нет отзывов"
    },
    description: "Описание отеля",
    discount: "скидка",
    footer: {
      search_link: "Продолжить поиски",
      search_text: "Не то, что вы искали?"
    },
    guests: {
      few: "",
      many: "",
      one: "%{count} гость",
      other: "%{count} гостей",
      two: "",
      zero: ""
    },
    hotel_website: "бронирование на сайте отеля",
    look_all: "Cмотреть все фото",
    look_map: "Показать на карте",
    mobile_location: "Местоположение",
    no_have_available_rooms: "Нет доступных номеров на ваши даты, выберите другие",
    on: "на",
    other_proposals: "Прочие предложения",
    proposals_group_no_photos: "Нет фото номеров",
    proposals_group_photos: "Смотреть фото номеров",
    rating: {
      average: "Средняя оценка",
      based_on: "на основе",
      header: "Оценка гостей"
    },
    read_all_reviews: "Читать все отзывы на",
    reviews: {
      few: "",
      many: "",
      one: "%{count} отзыв",
      other: "%{count} отзывов",
      two: ""
    },
    reviews_comments: {
      guest: "Гость",
      header: "отзывы гостей",
      show_all_reviews: "Показать все отзывы"
    },
    reviews_mark: "Оценка гостей",
    seeking_rooms: "Ищем свободные номера",
    show_all_rooms: "Показать все предложения",
    similar_hotels: {
      from: "от",
      title: "Похожие отели"
    },
    vat_tax_included: "включая все налоги и сборы"
  },
  hotels_off_find_hotels: "Скрыть область",
  hotels_on_find_hotels: "Искать в области",
  hotels_on_map: "Отели на карте",
  hotels_on_map_close: "Закрыть карту",
  informer: {
    search_results_expired: "К сожалению, результаты поиска устарели.",
    search_results_expired_short: "Результаты устарели",
    update_results: "Обновить"
  },
  languages: {
    ar: {
      code: "ar",
      flag: "SA",
      language: "العَرَبِيَّة"
    },
    az: {
      code: "az",
      flag: "AZ",
      language: "Azərbaycanca"
    },
    be: {
      code: "be",
      flag: "BY",
      language: "Беларуская"
    },
    bg: {
      code: "bg",
      flag: "BG",
      language: "Български"
    },
    bn: {
      code: "bn",
      flag: "BD",
      language: "`বাংলা"
    },
    bs: {
      code: "bs",
      flag: "BA",
      language: "Bosanski"
    },
    ca: {
      code: "ca",
      flag: "ES-CT",
      language: "Català"
    },
    ce: {
      code: "ce",
      flag: "RU",
      language: "Нохчийн"
    },
    cs: {
      code: "cs",
      flag: "CZ",
      language: "Čeština"
    },
    da: {
      code: "da",
      flag: "DK",
      language: "Dansk"
    },
    de: {
      code: "de",
      flag: "DE",
      language: "Deutsch"
    },
    el: {
      code: "el",
      flag: "GR",
      language: "Ελληνικά"
    },
    en: {
      code: "en",
      flag: "GB",
      language: "English"
    },
    es: {
      code: "es",
      flag: "ES",
      language: "Español"
    },
    et: {
      code: "et",
      flag: "EE",
      language: "Eesti"
    },
    fa: {
      code: "fa",
      flag: "IR",
      language: "فارسی"
    },
    fi: {
      code: "fi",
      flag: "FI",
      language: "Suomi"
    },
    fr: {
      code: "fr",
      flag: "FR",
      language: "Français"
    },
    he: {
      code: "he",
      flag: "IL",
      language: "עִבְרִית"
    },
    hi: {
      code: "hi",
      flag: "IN",
      language: "हिन्दी"
    },
    hr: {
      code: "hr",
      flag: "HR",
      language: "Hrvatski"
    },
    hu: {
      code: "hu",
      flag: "HU",
      language: "Magyar"
    },
    hy: {
      code: "hy",
      flag: "AM",
      language: "Հայերեն"
    },
    id: {
      code: "id",
      flag: "ID",
      language: "Bahasa Indonesia"
    },
    is: {
      code: "is",
      flag: "IS",
      language: "Íslenska"
    },
    it: {
      code: "it",
      flag: "IT",
      language: "Italiano"
    },
    ja: {
      code: "ja",
      flag: "JP",
      language: "日本"
    },
    ka: {
      code: "ka",
      flag: "GE",
      language: "ქართული"
    },
    kk: {
      code: "kk",
      flag: "KZ",
      language: "Қазақша"
    },
    km: {
      code: "км",
      language: "ខ្មែរ"
    },
    kmr: {
      code: "kmr",
      flag: "IR",
      language: "Kurdî"
    },
    ko: {
      code: "ko",
      flag: "KR",
      language: "한국어"
    },
    ku: {
      code: "ku",
      flag: "IQ",
      language: "كوردی"
    },
    ky: {
      code: "ky",
      language: "Кыргызча"
    },
    lt: {
      code: "lt",
      flag: "LT",
      language: "Lietuvių"
    },
    lv: {
      code: "lv",
      flag: "LV",
      language: "Latviešu"
    },
    me: {
      code: "me",
      flag: "ME",
      language: "Crnogorski"
    },
    mk: {
      code: "mk",
      language: "Mакедонски"
    },
    mn: {
      code: "mn",
      flag: "MN",
      language: "Монгол"
    },
    ms: {
      code: "ms",
      flag: "MY",
      language: "Bahasa Melayu"
    },
    nl: {
      code: "nl",
      flag: "NL",
      language: "Nederlands"
    },
    no: {
      code: "no",
      flag: "NO",
      language: "Norsk bokmål"
    },
    pl: {
      code: "pl",
      flag: "PL",
      language: "Polski"
    },
    pt: {
      code: "pt",
      flag: "PT",
      language: "Português"
    },
    pt_br: {
      code: "pt_BR",
      flag: "BR",
      language: "Brezhoneg"
    },
    ro: {
      code: "ro",
      flag: "RO",
      language: "Română"
    },
    ru: {
      code: "ru",
      flag: "RU",
      language: "Русский"
    },
    sk: {
      code: "sk",
      flag: "SK",
      language: "Slovenčina"
    },
    sl: {
      code: "sl",
      flag: "SI",
      language: "Slovenščina"
    },
    sq: {
      code: "sq",
      flag: "AL",
      language: "Shqip"
    },
    sr_latn: {
      code: "SR_LATN",
      language: "Srpski (latinica)"
    },
    sr_cs: {
      code: "sr_CS",
      language: "Српски"
    },
    sv: {
      code: "sv",
      flag: "SE",
      language: "Svenska"
    },
    tg: {
      code: "tg",
      flag: "TJ",
      language: "Тоҷикӣ"
    },
    th: {
      code: "th",
      flag: "TH",
      language: "ไทย"
    },
    tl: {
      code: "tl",
      flag: "PH",
      language: "Tagalog"
    },
    tr: {
      code: "tr",
      flag: "TR",
      language: "Türkçe"
    },
    uk: {
      code: "uk",
      flag: "UA",
      language: "Українська"
    },
    uz: {
      code: "uz",
      flag: "UZ",
      language: "O‘zbek"
    },
    vi: {
      code: "vi",
      flag: "VN",
      language: "Tiếng Việt"
    },
    zh_hans: {
      code: "zh_Hans",
      flag: "CN",
      language: "中文 (Simplified)"
    },
    zh_hant: {
      code: "zh_Hant",
      flag: "TW",
      language: "中文 (Traditional)"
    }
  },
  leg_durations: [
    "д",
    "ч",
    "м"
  ],
  moment: {
    time: "HH:mm",
    time_date: "HH:mm, DD MMM",
    time_short: "HH:mm",
    weekDay_date: "D MMM, dd"
  },
  nano_ui_localization: { return_flight: "Обратный рейс" },
  search: { tickets: { tickets: {
    at: "в",
    connection: "Пересадка",
    take_off: "Вылет"
  } } },
  search_history: {
    clear: "Очистить",
    from: "из",
    header: "История поисков",
    one_way: "(в одну сторону)"
  },
  search_progressbar: {
    completed_after: "Осталось",
    few_seconds: "несколько секунд…",
    flight_title: "Пожалуйста, подождите. Мы ищем лучшие варианты перелёта для вас.",
    hotel_title: "Пожалуйста, подождите. Мы ищем лучшие варианты проживания для вас.",
    sec: {
      few: "",
      many: "",
      one: "секунда.",
      other: "секунд.",
      two: "",
      zero: ""
    }
  },
  search_results: {
    layovers_direct: "Прямой перелёт",
    show_more_flights: "Показать ещё билеты",
    show_more_hotels: "Показать ещё отели",
    layovers_plural: {
      one: "%{count} пересадка",
      two: "%{count} пересадки",
      few: "%{count} пересадки",
      many: "%{count} пересадок",
      other: "%{count} пересадок"
    }
  },
  sorting: {
    all_tickets: "Все билеты",
    best_tickets: "Лучшие билеты",
    by: "по",
    discount: "Скидке",
    distance: "Расстоянию от центра",
    duration: "Времени в пути",
    earliest_depart: "Раннему вылету",
    latest_depart: "Позднему вылету",
    popularity: "Популярности",
    price: "Цена",
    rating: "Оценке гостей",
    sort_by: "Сортировать по",
    stars: "Количеству звёзд",
    title: "Сортировка",
    recommended_first: "Сначала рекомендуемые",
    cheapest_first: "Сначала дешёвые",
    departure_time: "Время вылета",
    arrival_time: "Время прибытия",
    layover_duration: "Длительность пересадок",
    trip_duration: "Длительность поездки",
    rating_sort: "Рейтинг"
  },
  ticket: {
    airport: "Аэропорт",
    ameneties: {
      legroom: "Расстояние для ног в сантиметрах",
      wifi: "Есть Wi-Fi"
    },
    baggage: {
      baggage: "Багаж",
      baggage_ro: "багажа",
      default_places: "%{decl}: 1 место до %{weight} %{units} на человека",
      description: "Багаж до %{baggage_weight} %{units}, включая ручную кладь (не более %{handbags_weight} %{units}).",
      handbags: "Ручная кладь",
      handbags_ro: "ручной клади",
      measurement: "см",
      not_included: "не входит в стоимость",
      one_place_closed: "1 место %{decl} до %{weight} %{units}",
      one_place_closed_with_measurement: "1 место %{decl} любого веса при габаритах не более %{dim} %{units}",
      one_place_closed_without_weight: "1 место %{decl} на человека",
      one_place_expanded: "%{decl}: 1 место до %{weight} %{units} на человека",
      one_place_expanded_with_measurement: "%{decl}: 1 место любого веса при габаритах не более %{dim} %{units}",
      one_place_expanded_without_weight: "%{decl}: 1 место на человека",
      several_places_closed: "%{count} места %{decl} до %{weight} %{units}",
      several_places_closed_without_weight: "%{count} места %{decl} на человека",
      several_places_expanded: "%{decl}: %{count} места до %{weight} %{units} на человека",
      several_places_expanded_without_weight: "%{decl}: %{count} места на человека",
      terms: "Нормы провоза багажа могут отличаться в зависимости от маршрута, класса перелёта, или тарифа — для уточнения обращайтесь в авиакомпанию",
      units: "кг",
      unknown_baggage: "Багаж неизвестен",
      unknown_handbags: "Ручная кладь неизвестна",
      without_baggage: "Без багажа",
      without_handbags: "Без ручной клади",
      cheap_fare: "Дешёвый тариф",
      cheap_fare_included: "Дешёвый тариф с багажом",
      no_carry_on_baggage: "Ручная кладь не входит в стоимость",
      add_baggage: "Добавить багаж",
      change_exchange_refund_policy: "Изменить обмен или возврат",
      handbags_size: "%{height}x%{width}x%{length}см",
      basic_fare: "Basic fare"
    },
    book_now: '<span class="ticket-action-button-deeplink-text__not-mobile">Купить</span> <span class="ticket-action-button-deeplink-text__mobile">Выбрать</span>',
    change_airports: "Смена аэропорта",
    day_layover: "Дневная пересадка",
    depart: "Туда",
    flight: "Рейс",
    flight_duration: "Время в пути",
    for: "за",
    hide_details: "Скрыть детали",
    layover: "Пересадка",
    next_day_messsage: "Прибытие",
    night_flight: "Ночной перелёт",
    night_layover: "Ночная пересадка",
    on: "на",
    proposals: {
      less: "Скрыть предложения",
      more: "Ещё предложения"
    },
    return: "Обратно",
    segment: "Сегмент",
    segment_filter: {
      departure: "Показать билеты только с этим вариантом вылета",
      return: "Показать билеты только с этим вариантом прилёта"
    },
    share: { link: "Cкопировать ссылку" },
    show_details: "Подробнее",
    buy: "Купить",
    update: "Обновить",
    charter_ticket: "Билет на чартер"
  },
  to: "До",
  user_mobile_settings: {
    apply: "применить",
    currency: "валюта",
    currency_and_language: "валюта и язык",
    language: "язык"
  },
  user_settings: {
    currency: "Выберите валюту",
    language: "Выберите язык",
    region: "Ваша страна",
    region_description: "Выбор страны может влиять на некоторые особенности поиска и покупки авиабилетов. Могут различаться: партнёры по бронированию, методы оплаты, политики возврата.",
    search: "Поиск"
  },
  autocomplete: { flights: { all_airports: "Все аэропорты" } },
  best_offers: {
    compare_hotels: "Сравнить отели",
    show_hotels: "Показать отели",
    title: "Лучшие предложения"
  },
  datepicker: {
    days: [
      "Пн",
      "Вт",
      "Ср",
      "Чт",
      "Пт",
      "Сб",
      "Вс"
    ],
    formats: {
      long_days: [
        "понедельник",
        "вторник",
        "среда",
        "четверг",
        "пятница",
        "суббота",
        "воскресенье"
      ],
      long_months: [
        "",
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря"
      ],
      short_days: [
        "пн",
        "вт",
        "ср",
        "чт",
        "пт",
        "сб",
        "вс"
      ],
      short_months: [
        "",
        "янв",
        "фев",
        "мар",
        "апр",
        "май",
        "июн",
        "июл",
        "авг",
        "сен",
        "окт",
        "ноя",
        "дек"
      ]
    },
    legend: {
      endDate: "Выезд",
      startDate: "Заезд"
    },
    months: [
      "",
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь"
    ],
    short_months: [
      "",
      "янв",
      "фев",
      "мар",
      "апр",
      "май",
      "июн",
      "июл",
      "авг",
      "сен",
      "окт",
      "ноя",
      "дек"
    ],
    start_from_sunday: 0,
    without_return_date: "Обратный билет не нужен"
  },
  flights: {
    add_segment: "Добавить перелёт",
    complex_flight: "Сложный маршрут",
    depart: "Туда",
    depart_date: "Дата вылета",
    destination: "Город прибытия",
    destination_placeholder: "Город или аэропорт",
    find_button: "Найти билеты",
    logo_url: "//www.aviasales.ru/",
    origin: "Город вылета",
    origin_placeholder: "Город или аэропорт",
    passengers: '["пассажир", "пассажира", "пассажиров"]',
    passengers_plural: {
      one: "%{count} пассажир",
      few: "%{count} пассажира",
      many: "%{count} пассажиров",
      other: "%{count} пассажиров"
    },
    passengers_label: "Пассажиры/Класс",
    return: "Обратно",
    return_placeholder: "Обратно",
    slogan: "Поиск дешёвых авиабилетов",
    to_simple_flight: "Вернуться к простому маршруту",
    trip_class: {
      business: "бизнес-класс",
      economy: "эконом"
    }
  },
  guests: {
    adults: "Взрослые",
    children: "Дети",
    children_age: "Возраст",
    children_details: "до 17 лет"
  },
  hotel_locale: "ru_RU",
  hotels: {
    checkin: "Заезд",
    checkout: "Выезд",
    find_button: "Узнать цены",
    guests: '["гость", "гостя", "гостей"]',
    guests_plural: {
      one: "%{count} гость",
      few: "%{count} гостя",
      many: "%{count} гостей",
      other: "%{count} гостей"
    },
    guests_label: "Гости",
    hotels: '["отель", "отеля", "отелей"]',
    hotels_plural: {
      one: "%{count} отель",
      few: "%{count} отеля",
      many: "%{count} отелей",
      other: "%{count} отелей"
    },
    logo_url: "//hotellook.ru/",
    origin: "Город или отель",
    origin_placeholder: "Город или отель",
    slogan: "Поиск дешёвых отелей"
  },
  locale: "ru_RU",
  passengers: {
    adults: "Взрослые",
    business_class: "Бизнес-класс",
    business_class_short: "Бизнес-класс",
    children: "Дети",
    children_details: "до 12 лет",
    infants: "Младенцы",
    infants_details: "до 2 лет",
    popups: {
      checkbox_label: "Класс перелёта",
      children_details: "Не более 8 человек",
      description: "Ваш возраст на момент путешествия должен соответствовать категории забронированного билета. У авиакомпании есть ограничения для пассажиров младше 18 лет и детей, путешествующих без сопровождения взрослых.",
      header: "Пассажиры",
      infants_details: "Без места"
    },
    ready: "Готово",
    ready_popup: "Применить"
  },
  tabs: {
    flights: "АВИАБИЛЕТЫ",
    hotels: "ОТЕЛИ"
  },
  validation: {
    bad_date: "Дата раньше предыдущей",
    same_places: "Пункты отправления и прибытия должны различаться"
  },
  price: { suffixes: { million: "M" } },
  singleairlinemodal: {
    filter_out_flights_operated_by_multiple_airlines: `Скроем билеты, 
где участвуют несколько авиакомпаний`,
    confirm: "Понятно"
  },
  filterticket: {
    overnight_layover: "Ночная пересадка",
    airport_change: "Смена аэропорта",
    long_layover: "Длинная пересадка",
    your_return_flight_wont_land_at_the_same_airport_you_left_from: "Аэропорт прилёта отличается от аэропорта вылета",
    visa_required: "Требуется виза"
  },
  flight: {
    airport_change: "Смена аэропорта с «%{previousAirport}» на «%{currentAirport}» %{cityWhere}. Пересадка: %{transferTime}",
    travel_time: "Время в пути: %{time}",
    transfer_time: "Пересадка %{time}"
  },
  visamodal: {
    filter_by_visa_requirements: "Лучше перепроверить визовые требования перед полётом. Мы покажем рейсы с безвизовыми пересадками, но правила въезда могут поменяться — проверьте их самостоятельно перед поездкой",
    confirm: "Понятно"
  },
  itinerarynote: {
    repeat_checkin: "Повторная регистрация",
    overnight_layover: "Ночная пересадка",
    changing_the_airport: "Изменение аэропорта",
    short_layover: "Короткая пересадка",
    layover: "Пересадка"
  },
  proposal_card: { prices_are_outdated: "Цены устарели" },
  connecting_airports: { search_input_placeholder: "Авиакомпания, город, страна, код IATA" },
  flight_filters_modal: { confirm: "Хорошо" },
  no_ticket_modal: {
    ticket_was_sold_out: "Этот билет был распродан",
    look_for_another_ticket: "Возможно, он появится снова, но это не точно. Безопаснее поискать другой — у нас еще много дешевых вариантов!",
    find_another_ticket: "Найти другой билет"
  },
  ticket_proposals: {
    less: "Меньше",
    more_offers: "Еще %{count} предложений"
  },
  to_price: "До %{price}",
  powered_by: "Предоставлено",
  chartermodal: {
    charter_ticket: "Билет на чартер",
    cheap_flights_tour_operator_tips: "Их продают туроператоры, а не авиакомпании, поэтому выходит дешевле, но стоит учитывать некоторые моменты при бронировании.",
    tickets_delivery_info: "Билеты пришлют накануне вылета, а номер заказа — сразу после оплаты.",
    tour_operator_ticket_discount_reason: "Их продают туроператоры, а не авиакомпании, поэтому выходит дешевле.",
    flight_rules_online_checkin_animals: "Правила онлайн-регистрации и провоза животных могут отличаться от обычных рейсов.",
    charter_seats_on_regular_flights: "Иногда чартерные места бывают даже на регулярных рейсах — их выкупают турагентства."
  },
  show_hotels: "Показать отели",
  transfer: {
    "repeat_check-in": "повторная регистрация",
    overnight: "ночная пересадка",
    airport_change: "смена аэропорта",
    short_layover: "короткая пересадка",
    visa_required: "понадобится виза"
  }
} };
export {
  e as default
};
