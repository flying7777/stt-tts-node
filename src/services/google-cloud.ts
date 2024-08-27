import fs from "fs";
import path from "path";
import { SpeechClient } from "@google-cloud/speech";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";

const speechClient = new SpeechClient();
const textToSpeechclient = new TextToSpeechClient();
const text = "אֲנִי סְטוּדֶנְט.";

const getTextToSpeech = async () => {
	try {
		const request: any = {
			input: { text: text },
			voice: { languageCode: 'he', ssmlGender: 'NEUTRAL' },
			audioConfig: { audioEncoding: 'MP3' },
		}

		const filePath = path.join('./src/assets/audio.mp3');
		const [response] = await textToSpeechclient.synthesizeSpeech(request);
		fs.writeFileSync(filePath, response.audioContent, 'binary');
		console.log('Audio content written to file:', filePath);
	} catch (err: any) {
		console.log(err.message);
	}
}

const getSpeechToText = async () => {
	try {
		await getTextToSpeech();
		const audioFile = fs.readFileSync('./src/assets/audio.mp3');
		const audioBytes = audioFile.toString('base64');

		const request: any = {
			audio: {
				content: audioBytes,
			},
			config: {
				encoding: 'MP3',
				sampleRateHertz: 16000,
				languageCode: 'he',
			}
		}

		const [response] = await speechClient.recognize(request);
		const transcription = response.results?.map(result => result.alternatives?.[0].transcript).join('\n');
		console.log(`Transcription: ${transcription}`, response.results.length);
	} catch (err: any) {
		console.log(err.message);
	}
}

export { getTextToSpeech, getSpeechToText }