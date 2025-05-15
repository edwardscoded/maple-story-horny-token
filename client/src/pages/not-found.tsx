import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-beige">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md mx-4 pixel-border">
          <CardContent className="pt-6">
            <div className="flex mb-4 gap-2 items-center">
              <AlertCircle className="h-8 w-8 text-avaxRed" />
              <h1 className="text-2xl font-pixel text-darkBrown">404 Page Not Found</h1>
            </div>

            <p className="mt-4 text-lg font-body text-darkBrown mb-6">
              Oh no! You've wandered too deep into the Horny Forest and got lost.
            </p>
            
            <Link href="/">
              <a className="font-pixel text-xs py-2 px-4 bg-avaxRed text-white hover:bg-opacity-90 shadow-md block text-center">
                Return to the Forest Gate
              </a>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
