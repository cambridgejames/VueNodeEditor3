import { defineComponent, inject, Ref, ref, SetupContext } from "vue";
import NeCompSvg from "@/components/NeCompSvg";
import { NeInputPanelIntf } from "./interface/neInputPanelIntf";
import { getMouseEventProcessor } from "./event/mouseEventProcessor";

export default defineComponent({
  name: "NeBaseNode",
  components: {
    NeCompSvg
  },
  props: {
    x: {
      type: Number,
      default: 0,
      required: true
    },
    y: {
      type: Number,
      default: 0,
      required: true
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    color: {
      type: String,
      default: "#eee",
      required: false
    }
  },
  emits: {
    neLeftClick: null,
    neRightClick: null
  },
  setup(propsData, context: SetupContext) {
    const nodePanel = ref<HTMLElement>();
    const nodePanelConf = ref({
      x: propsData.x,
      y: propsData.y,
      width: 120,
      height: 40,
      minWidth: 120,
      minHeight: 40,
      title: propsData.title,
      color: propsData.color
    } as NeInputPanelIntf);

    /************************
     *  Imported Functions  *
     ************************/

    const panelConf = inject("panelConf") as Ref;
    const MouseEventProcessor = getMouseEventProcessor(nodePanel, nodePanelConf, panelConf, context);

    return {
      nodePanel,
      nodePanelConf,
      MouseEventProcessor
    };
  }
});
