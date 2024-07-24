import { GeneratePodcastProps } from "@/types";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useToast, toast } from "./ui/use-toast";

const useGeneratePodcast = ({
  setAudio,
  setAudioStorageId,
  voicePrompt,
  voiceType
}: GeneratePodcastProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAudio = useAction(api.openai.generateAudioAction);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const getAudioUrl = useMutation(api.podcasts.getUrl);

  const { toast } = useToast();

  const generatePodcast = async () => {
    setIsGenerating(true);
    setAudio("");

    if (!voicePrompt) {
      toast({
        title: "Error",
        description: "Please enter a voice prompt",
        variant: "destructive"
      });
      setIsGenerating(false);
      return;
    }

    try {
      const audio = await generateAudio({
        input: voicePrompt,
        voice: voiceType
      });
      const blob = new Blob([audio], { type: "audio/mpeg" });
      const filename = `audio-${uuidv4()}.mp3`;
      const file = new File([blob], filename, { type: "audio/mpeg" });
      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;
      setAudioStorageId(storageId);
      const audioUrl = await getAudioUrl({ storageId });
      setAudio(audioUrl!);
      setIsGenerating(false);
      toast({
        title: "Success",
        description: "Audio generated successfully"
      });
    } catch (e) {
      console.error(e);
      setIsGenerating(false);
      toast({
        title: "Error",
        description: "Failed to generate audio",
        variant: "destructive"
      });
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
          onClick={generatePodcast}
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
