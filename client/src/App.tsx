import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import ForestGate from "@/pages/ForestGate";
import SacredTree from "@/pages/SacredTree";
import MushroomCircle from "@/pages/MushroomCircle";
import SporesOfWealth from "@/pages/SporesOfWealth";
import FungusFramework from "@/pages/FungusFramework";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/forest-gate" component={ForestGate} />
      <Route path="/sacred-tree" component={SacredTree} />
      <Route path="/mushroom-circle" component={MushroomCircle} />
      <Route path="/spores-of-wealth" component={SporesOfWealth} />
      <Route path="/fungus-framework" component={FungusFramework} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Layout>
          <Router />
        </Layout>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
