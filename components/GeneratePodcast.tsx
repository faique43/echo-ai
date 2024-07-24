import { GeneratePodcastProps } from "@/types";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { useState } from "react";

const useGeneratePodcast = ({
  setAudio,
  audio,
  setAudioDuration,
  voicePrompt,
  setVoicePrompt,
  voiceType
}: GeneratePodcastProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePodcast = async () => {
    setIsGenerating(true);
    setAudio("");

    if (!voicePrompt) {
      // todo: show error
      setIsGenerating(false);
      return;
    }

    try {
      // const response = await api.generateAudio.post({
      //   voiceType,
      //   voicePrompt
      // });
      // setAudio(response.audioUrl);
      setIsGenerating(false);
    } catch (e) {
      console.error(e);
      setIsGenerating(false);
      // todo: show error
    }
  };

  return { isGenerating, generatePodcast };
};

const GeneratePodcast = (props: GeneratePodcastProps) => {
  const { isGenerating, generatePodcast } = useGeneratePodcast(props);

  return (
    <div>
      <div className="flex flex-col gap-2.5">
        <Label className="text-16 font-bold text-white-1">
          AI Prompt to Generate Podcast
        </Label>
        <Textarea
          className="input-class font-light focus-visible:ring-offset-orange-1"
          placeholder="Enter Text to Generate Podcast"
          rows={5}
          value={props.voicePrompt}
          onChange={(e) => props.setVoicePrompt(e.target.value)}
        />
      </div>
      <div className="mt-5 w-full max-w-[200px]">
        <Button
          type="submit"
          className=" bg-orange-1 !text-white-1 text-16 font-bold"
        >
          {isGenerating ? (
            <>
              <Loader size={20} className="animate-spin mr-2" />
              Generating
            </>
          ) : (
            "Generate Audio"
          )}
        </Button>
      </div>
      {props.audio && (
        <div className="flex flex-col gap-2.5 mt-5">
          <Label className="text-16 font-bold text-white-1">Audio</Label>
          <audio
            controls
            src={props.audio}
            autoPlay
            className="mt-5"
            onLoadedMetadataCapture={(e) =>
              props.setAudioDuration(e.currentTarget.duration)
            }
          />
        </div>
      )}
    </div>
  );
};

export default GeneratePodcast;
