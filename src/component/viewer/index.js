import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  Fragment,
} from "react";
import clsx from "clsx";
import OSDConfig from "./config";
import OpenSeaDragon from "openseadragon";
import Controls from "@/component/controls";
import { usePages, useNavigation, useLayout, useOptions } from "@/hooks";
import { LAYOUT_MODE } from "@/constants";
import { zoomToPercent, zoomClamp, animateTile } from "@/utils";

const renderLayout = (viewer) => {
  const world = viewer.world;
  const count = world.getItemCount();
  const pos = new OpenSeaDragon.Point(0, 0);
  // Cache tile data
  let bounds = null;
  // first page
  let firstPage = null;
  let firstPageBounds = null;
  // Next page
  let nextPage = null;
  let nextPageBounds = null;

  if (count > 0) {
    // Page view (single page)
    firstPage = world.getItemAt(0);
    firstPageBounds = firstPage.getBounds();

    // Book view ( two pages )
    if (count > 1) {
      nextPage = world.getItemAt(1);
      nextPageBounds = nextPage.getBounds();

      // Auto resize page to fit first page height
      if (firstPageBounds.height > nextPageBounds.height) {
        nextPage.setHeight(firstPageBounds.height, true);
        // Recalculate bounds
        nextPageBounds = nextPage.getBounds();
      }

      // Auto resize page to fit next page height
      if (nextPageBounds.height > firstPageBounds.height) {
        firstPage.setHeight(nextPageBounds.height, true);
        // Recalculate bounds
        firstPageBounds = firstPage.getBounds();
      }
    }

    // Set position for first page
    if (firstPage && firstPageBounds) {
      firstPage.setPosition(pos, true);
      pos.x += firstPageBounds.width;
    }

    // Set position for next page
    if (nextPage && nextPageBounds) {
      nextPage.setPosition(pos, true);
      pos.x += nextPageBounds.width;
    }

    viewer.viewport.update();
    viewer.viewport.goHome(true);
  }
};

function Viewer() {
  const osd = useRef();
  const container = useRef();
  const { pages, currentPages } = usePages();
  const { currentPage, currentPageNumber } = useNavigation();
  const { options } = useOptions();
  const [layout] = useLayout();
  const [zoomPercent, setZoomPercent] = useState(0);

  const [isLoadingTile, setIsLoadingTile] = useState(false)
  const [prevTileLoaded, setPrevTileLoaded] = useState(null)

  const getTargetZoom = (scale = 1) => {
    let zooms = [];
    const { viewport, world } = osd.current;
    const count = world.getItemCount();

    for (let i = 0; i < count; i++) {
      zooms[i] = world.getItemAt(i).imageToViewportZoom(scale);
    }

    return Math.max(zooms) || zooms[0];
  };

  const updateZoomLimits = () => {
    const { viewport, world } = osd.current;
    const targetZoom = 0.9;
    const realTargetZoom = getTargetZoom();
    const imageBounds = world.getHomeBounds();
    const viewportBounds = viewport.getBounds();
    const imageAspect = imageBounds.width / imageBounds.height;
    const viewportAspect = viewportBounds.width / viewportBounds.height;
    const aspectFactor = imageAspect / viewportAspect;
    const zoomFactor = (aspectFactor >= 1 ? 1 : aspectFactor) * targetZoom;
    const zoom = zoomFactor / imageBounds.width;
    const minZoom = realTargetZoom <= zoom ? realTargetZoom : zoom;
    viewport.defaultZoomLevel = minZoom;
    viewport.minZoomLevel = minZoom;
    viewport.maxZoomLevel = realTargetZoom;
    viewport.applyConstraints();
  };

  const updateZoom = (scale = 1) => {
    const { viewport } = osd.current;
    const max = viewport.getMaxZoom();
    const min = viewport.getMinZoom();

    if (scale) {
      // Clamp zoom value
      let zoom = zoomClamp(scale, max, min);
      // Update
      viewport.zoomTo(zoom);
      viewport.ensureVisible();
    }
  };

  const zoomIn = () => {
    const { viewport } = osd.current;
    const max = viewport.getMaxZoom();
    const zoom = viewport.getZoom();
    const currentZoom = zoomToPercent(zoom, max);
    updateZoom(currentZoom + 15);
  };

  const zoomOut = () => {
    const { viewport } = osd.current;
    const max = viewport.getMaxZoom();
    const zoom = viewport.getZoom();
    const currentZoom = zoomToPercent(zoom, max);
    updateZoom(currentZoom - 15);
  };

  const zoomToOriginalSize = () => {
    const { viewport } = osd.current;
    const targetZoom = getTargetZoom();
    viewport.zoomTo(targetZoom, null, true);
  };

  const handleAddItem = useCallback((eventData) => {
      const { eventSource: world, item } = eventData;
      const center = new OpenSeaDragon.Point(0, 0);
      item.setPosition(center, true);
      animateTile(item, "opacity", 1 );


      if (world.getItemCount() === 2) {
        animateTile(world.getItemAt(0), "opacity", 0, {
          easing: "easeInOutQuart",
          delay: 300,
          duration: 300,
          onAnimationEnd: (prevTile) => {
            world.removeItem(prevTile);
            world.setItemIndex(item, 0);
            osd.current.viewport.update()
            osd.current.viewport.goHome()
            setIsLoadingTile(false)
          },
        });
      } else {
      osd.current.viewport.update()
      osd.current.viewport.goHome()
      setIsLoadingTile(false)
    }

  }, [setIsLoadingTile, osd.current])

  // On mount: Create openseadragon instance
  useEffect(() => {
    osd.current = OpenSeaDragon({ element: container.current, ...OSDConfig });
    osd.current.world.addHandler("add-item", handleAddItem);

    osd.current.addHandler("add-item-failed", (e) => {
      console.error(e);
    });

    osd.current.addHandler("resize", updateZoomLimits);

    osd.current.addHandler("zoom", () => {
      const { viewport } = osd.current;
      const max = viewport.getMaxZoom();
      const zoom = viewport.getZoom();
      const currentZoom = zoomToPercent(zoom, max);
      setZoomPercent(currentZoom);
    });

    // On unmount: Destroy openseadragon instance
    return () => {
      if (osd.current) {
        osd.current.destroy();
        osd.current = null;
      }
    }

  }, []);

  // Render pages
  useEffect(() => {
    console.info("Loop?")
    if (isLoadingTile) return;

    if (currentPages && currentPages.length) {
      if (currentPages[0].url === prevTileLoaded) return;
      const { world } = osd.current;
      currentPages.forEach((page, index) => {
        const replace = world.getItemAt(index) !== undefined;
        const count = world.getItemCount();

        if (count < 2) {
          osd.current.addSimpleImage({
            ...page,
            index: count,
            preload: true,
            opacity: 0,
          });

        }
      });
      setPrevTileLoaded(currentPages[0].url)
      setIsLoadingTile(true)
    }
  }, [currentPages, isLoadingTile, setIsLoadingTile, prevTileLoaded, setPrevTileLoaded ]);

  return (
    <Fragment>
      <div ref={container} className="villian-render" />
      <Controls zoom={zoomPercent} viewerActions={{ zoomIn, zoomOut }} />
    </Fragment>
  );
}

export default React.memo(Viewer);
