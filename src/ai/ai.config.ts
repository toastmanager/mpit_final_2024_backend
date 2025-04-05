import { Configuration, Value } from '@itgorillaz/configify';
import { IsNotEmpty } from 'class-validator';

@Configuration()
export class AiConfig {
	@IsNotEmpty()
	@Value('TOGETHER_API_KEY')
	apiKey: string;
}
