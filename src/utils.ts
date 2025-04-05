import { TransformFnParams } from 'class-transformer';

type RemoveNull<T> = {
	[K in keyof T]: null extends T[K] ? Exclude<T[K], null> | undefined : T[K];
};

export function removeNullFields<T extends object>(obj: T): RemoveNull<T> {
	const result: any = {};
	for (const key in obj) {
		const value = obj[key];
		result[key] = value === null ? undefined : value;
	}
	return result;
}

export function ToEnum<T extends Record<string, unknown>>(
	enumType: T,
): (params: TransformFnParams) => T[keyof T] {
	return ({ value }) => {
		const enumValues = Object.values(enumType) as unknown as T[keyof T][];

		if (enumValues.includes(value as T[keyof T])) {
			return value as T[keyof T];
		}

		if (typeof value === 'string') {
			const lowerValue = value.toLowerCase();
			const foundValue = enumValues.find(
				(enumValue) => String(enumValue).toLowerCase() === lowerValue,
			);
			if (foundValue) return foundValue;
		}

		return enumValues[0]; // Return first enum value as default
	};
}

export const createSlug = (str) => {
	// Таблица транслитерации кириллицы в латиницу
	const cyrToLatMap = {
		а: 'a',
		б: 'b',
		в: 'v',
		г: 'g',
		д: 'd',
		е: 'e',
		ё: 'yo',
		ж: 'zh',
		з: 'z',
		и: 'i',
		й: 'y',
		к: 'k',
		л: 'l',
		м: 'm',
		н: 'n',
		о: 'o',
		п: 'p',
		р: 'r',
		с: 's',
		т: 't',
		у: 'u',
		ф: 'f',
		х: 'h',
		ц: 'ts',
		ч: 'ch',
		ш: 'sh',
		щ: 'sch',
		ъ: '',
		ы: 'y',
		ь: '',
		э: 'e',
		ю: 'yu',
		я: 'ya',
		А: 'A',
		Б: 'B',
		В: 'V',
		Г: 'G',
		Д: 'D',
		Е: 'E',
		Ё: 'Yo',
		Ж: 'Zh',
		З: 'Z',
		И: 'I',
		Й: 'Y',
		К: 'K',
		Л: 'L',
		М: 'M',
		Н: 'N',
		О: 'O',
		П: 'P',
		Р: 'R',
		С: 'S',
		Т: 'T',
		У: 'U',
		Ф: 'F',
		Х: 'H',
		Ц: 'Ts',
		Ч: 'Ch',
		Ш: 'Sh',
		Щ: 'Sch',
		Ъ: '',
		Ы: 'Y',
		Ь: '',
		Э: 'E',
		Ю: 'Yu',
		Я: 'Ya',
	};

	return str
		.toString() // На случай, если передано не строковое значение
		.toLowerCase() // Переводим в нижний регистр
		.replace(/[а-яё]/g, (char) => cyrToLatMap[char] || char) // Транслитерируем кириллицу
		.normalize('NFD') // Разбиваем диакритические знаки (для латиницы)
		.replace(/[\u0300-\u036f]/g, '') // Удаляем оставшиеся диакритические знаки
		.replace(/[^\w\s-]/g, '') // Удаляем всё, кроме букв, цифр, пробелов и дефисов
		.replace(/\s+/g, '-') // Заменяем пробелы на дефисы
		.replace(/-+/g, '-') // Убираем повторяющиеся дефисы
		.replace(/^-+/, '') // Удаляем дефисы в начале
		.replace(/-+$/, ''); // Удаляем дефисы в конце
};
